module "aws_vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "3.14.2"

  name           = var.vpc_name
  cidr           = var.vpc_cidr
  azs            = var.vpc_azs
  public_subnets = var.vpc_public_subnets
  tags           = local.tags
}

# PUBLIC SUBNET SECURITY GROUP
module "public_subnet_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "4.9.0"

  name        = var.public_subnet_name
  description = var.public_subnet_desc
  vpc_id      = module.aws_vpc.vpc_id

  ingress_cidr_blocks = var.public_subnet_ingress_cidr
  ingress_rules       = var.public_subnet_ingress_rules

  egress_cidr_blocks = var.public_subnet_egress_cidr
  egress_rules       = var.public_subnet_egress_rules

  tags = local.tags
}

# ECS CLUSTER
resource "aws_ecs_cluster" "dvwa_cluster" {
  name = var.cluster_name
}

# ECS LOGGING
resource "aws_cloudwatch_log_group" "dvwa" {
  name = var.cw_log_group
}

# IAM POLICY FOR ECS ROLES
data "aws_iam_policy_document" "ecs_task_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

data "aws_iam_policy" "ecs_task_execution_role" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# ECS CONFIG FOR DVWA
# ECS Service
resource "aws_ecs_service" "dvwa" {
  name            = var.ecs_svc_name
  cluster         = aws_ecs_cluster.dvwa_cluster.id
  task_definition = aws_ecs_task_definition.dvwa.arn

  launch_type = "FARGATE"

  network_configuration {
    assign_public_ip = true

    security_groups = [
      module.public_subnet_sg.security_group_id
    ]

    subnets = tolist(module.aws_vpc.public_subnets)
  }

  desired_count = 1

}

# ECS DVWA Task Definition
resource "aws_ecs_task_definition" "dvwa" {
  family = var.ecs_task_family

  container_definitions = <<EOF
  [
    {
      "name": "dvwa",
      "environment": [
        {"name": "PORT", "value": "80"}
      ],
      "image": "vulnerables/web-dvwa",
      "portMappings": [
        {
          "containerPort": 80
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-region": "${var.region}",
          "awslogs-group": "/ecs/dvwa",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
  EOF

  execution_role_arn = aws_iam_role.dvwa_task_execution_role.arn

  cpu                      = 256
  memory                   = 512
  requires_compatibilities = ["FARGATE"]

  network_mode = "awsvpc"

}

# ECS DVWA IAM ROLE AND ATTACHMENT
resource "aws_iam_role" "dvwa_task_execution_role" {
  name               = var.ecs_role_name
  assume_role_policy = data.aws_iam_policy_document.ecs_task_assume_role.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role" {
  role       = aws_iam_role.dvwa_task_execution_role.name
  policy_arn = data.aws_iam_policy.ecs_task_execution_role.arn
}
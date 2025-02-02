variable "region" {
  type    = string
  default = "us-east-1"
}

variable "owner" {
  type = string
}

# VPC Vars
variable "vpc_name" {
  type    = string
  default = "dvwa_vpc"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "vpc_azs" {
  type    = list(any)
  default = ["us-east-1a", "us-east-1b"]
}

variable "vpc_public_subnets" {
  type    = list(any)
  default = ["10.0.1.0/24", "10.0.2.0/24"]
}

# Security Group
variable "public_subnet_name" {
  type    = string
  default = "public-subnet-sg"
}

variable "public_subnet_desc" {
  type    = string
  default = "Security group for the public subnet"
}

variable "public_subnet_ingress_cidr" {
  type        = list(any)
  description = "Add the ip address(es) that need(s) to access this ecs task in cidr format"
}

variable "public_subnet_ingress_rules" {
  type    = list(any)
  default = ["http-80-tcp"]
}

variable "public_subnet_egress_cidr" {
  type    = list(any)
  default = ["0.0.0.0/0"]
}

variable "public_subnet_egress_rules" {
  type    = list(any)
  default = ["all-all"]
}

# ECS Cluster
variable "cluster_name" {
  type    = string
  default = "dvwa-cluster"
}

# ECS Service
variable "cw_log_group" {
  type    = string
  default = "/ecs/dvwa"
}

variable "ecs_svc_name" {
  type    = string
  default = "dvwa"
}

variable "ecs_task_family" {
  type    = string
  default = "dvwa"
}

variable "ecs_role_name" {
  type    = string
  default = "dvwa-task-execution-role"
}

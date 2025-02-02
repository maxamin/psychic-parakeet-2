locals {
  region = var.region
  tags = {
    Terraform   = "True"
    Owner       = var.owner
    KeepRunning = "No"
  }
}
// --------------------
// Provider Configuration
// --------------------
provider "google" {
  project = var.project_id
  region  = var.region
}


// --------------------
// Enable Required APIs
// --------------------
resource "google_project_service" "run_api" {
  service = "run.googleapis.com"
}

resource "google_project_service" "firestore_api" {
  service = "firestore.googleapis.com"
}


// --------------------
// Firestore Database
// --------------------
// Native mode database (simplest option)
resource "google_firestore_database" "default" {
  name        = "(default)"
  location_id = var.region
  type        = "FIRESTORE_NATIVE"
}
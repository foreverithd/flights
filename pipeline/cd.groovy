pipeline {
  agent any 
  stages {
    stage('Checking the application status') {
      steps {
        script {
          def container_status = sh(script: "docker ps -a|grep -i nodejsapplication", returnStatus: true) == 0
		      println "${container_status}"
          if ("${container_status}" == "true")
          { 
            sh 'docker rm -f nodejsapplication'
          }
        }
      }
    }
    stage('Starting the application') {
      steps {
        withCredentials([string(credentialsId: 'DB_NAME', variable: 'DB_NAME'), string(credentialsId: 'DB_KEY', variable: 'DB_KEY'), string(credentialsId: 'COSMO_PORT', variable: 'COSMO_PORT')]) 
        {
          sh "docker run -d --name nodejsapplication -e DB_NAME=$DB_NAME -e DB_KEY=$DB_KEY -e COSMO_PORT=$COSMO_PORT -p 3000:3000 nodejsapplication"

        }
      }
    }
  }
}
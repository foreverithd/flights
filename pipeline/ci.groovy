pipeline {
  agent any
  stages {
    stage('Git checkout') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'CheckoutOption']], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'gitaccess', url: 'https://github.com/foreverithd/flights.git']]])
      }
    }
    stage('Building the image') {
      steps {
        sh """
        docker build -t "nodejsapplication" .
        """
      }
    }
    stage('Push Image to Dockerhub') {
      steps {
        // This step should not normally be used in your script. Consult the inline help for details.
            sh """
              docker tag nodejsapplication foreverithd/nodejsapplication:latest
              docker push foreverithd/nodejsapplication:latest
            """
      }
    }
}
}
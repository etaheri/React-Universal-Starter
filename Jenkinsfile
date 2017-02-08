pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Deploy') {
          steps {
              sh """
                ssh ubuntu@52.23.219.207
                cd october-frontend
                git pull
                npm install
                npm run build
                pm2 restart all
                exit
              """
          }
       }
    }
}

pipeline {
    agent any

    stages {
        stage('Check node and npm versions') {
            agent {
                docker {
                    image 'node:20'
                    reuseNode true
                }
            }
            steps {
                sh '''
                node --version
                npm --version
                '''
            }
        }
        
        stage('Install dependencies') {
            agent {
                docker {
                    image 'node:20'
                    reuseNode true
                }
            }
            steps {
                sh '''
                cd todo_service
                npm ci
                cd ..
                
                cd user_service
                npm ci
                cd ..

                cd gateway
                npm ci
                cd ..
                '''
            }
        }
        
        stage('Test') {
            agent {
                docker {
                    image 'node:20'
                    reuseNode true
                }
            }
            steps {
                sh '''
                cd todo_service
                npm test
                cd ..
                '''
            }
        }

        stage('Build and push docker image') {
            steps {
                sh '''
                docker compose build
                
                docker push vsen910/todo-service-todo-app
                docker push vsen910/user-service-todo-app
                docker push vsen910/gateway-todo-app
                '''
            }
        }
    }
}
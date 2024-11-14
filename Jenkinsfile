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

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: '4a2c4c7c-feb2-4211-989e-cd8acc6af636', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    }
                }
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
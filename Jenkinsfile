pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonarscanner'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    }

    stages {
        stage('SonarQube analysis') {
            steps {
                // slackSend channel: "#devops-project", color: "#439FE0", message: "Test Started: ${env.JOB_NAME} ${env.BUILD_NUMBER}"
                withSonarQubeEnv('sonarserver') {
                    sh """
                    ${SCANNER_HOME}/bin/sonar-scanner \
                    -Dsonar.projectKey=sonarqube-react-project \
                    -Dsonar.sources=."""
                }
            }
        }

    // stage("Quality Gate") {
    //     steps {
    //         timeout(time: 1, unit: 'HOURS') {
    //         script{
    //             def qg = waitForQualityGate()
    //             if (qg.status != 'OK') {
    //                 error "Pipeline aborted due to quality gate failure: ${qg.status}"
    //             }
    //             echo 'Quality Gate Passed'
    //             }
    //         }
    //     }
    //     post {
    //         success {
    //             script {
    //                 slackSend channel: "#devops-project", color: "good", message: "Test succeeded: ${env.JOB_NAME} ${env.BUILD_NUMBER}"
    //             }
    //         }
    //         failure {
    //             script {
    //                 slackSend channel: "#devops-project", color: "#FF0000", message: "Test failed: ${env.JOB_NAME} ${env.BUILD_NUMBER}"
    //                 error "Pipeline aborted due to quality gate failure: ${qg.status}"
    //             }
    //         }
    //     }
    // }

        stage('Build & Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        // Build Docker image
                        sh "docker build -t ${DOCKERHUB_USERNAME}/chatbot:latest ."

                         // Log in to Docker Hub
                        sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"

                        // Push Docker image to Docker Hub
                        sh "docker push ${DOCKERHUB_USERNAME}/chatbot:latest"
                    }
                }
            }
        }
    }
    post {
		always {
			sh 'docker logout'
		}
	}
}

pipeline {
    agent any
    environment {
        SCANNER_HOME = tool 'sonarscanner'
    }
    stages {
        stage('Check and Install Docker') {
            steps {
                script {
                    def isDockerInstalled = sh(script: 'docker --version', returnStatus: true) == 0
                    if (!isDockerInstalled) {
                        echo 'Docker is not installed. Installing Docker...'
                        sh 'curl -fsSL https://get.docker.com -o get-docker.sh'
                        sh 'sh get-docker.sh'
                        sh 'sudo usermod -aG docker $USER'
                        sh 'apt-get update -qq'
                        sh 'sudo systemctl restart jenkins'
                        echo 'Docker installed successfully.'
            } else {
                        echo 'Docker is already installed.'
                    }
                }
            }
        }

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
    }
}

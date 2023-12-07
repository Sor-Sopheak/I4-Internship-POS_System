#!/bin/bash

alert() {
    DATE="$(TZ=Asia/Phnom_Penh date '+%Y-%m-%d')"
    TIME="$(TZ=Asia/Phnom_Penh date '+%I:%M:%S %p')"
    COMMIT_HASH="$(git rev-parse --short HEAD)"
    COMMIT_LINK="[View Commit](https://gitlab.com/i4-internship/self-ordering-pos-system-vuejs/commit/$COMMIT_HASH)"
    
    L="------------------------------------------------------"
    Server="<b>Server</b>: $VM_IPADDRESS "
    COMMITER=$(git log -n 1 --pretty=format:"<b>COMMITER</b>: %cN %n<b>DATE</b>: $DATE %n<b>TIME</b>: $TIME")
    MSG=$(git log -n 1 --pretty=format:"<b>MESSAGE</b>: %s")
    
    MSG="🚀 <b>Deployment Status:</b> $1%0A%0A$L%0A<b>PROJECT</b>: SOS%0A<b>APPLICATION</b>: sos-automation %0A<b>STATUS</b>: $1%0A
    <b>ENV</b>: Development%0A$L%0A$COMMITER%0A<b>COMMIT</b>: $COMMIT_LINK%0A<b>DETAILS</b>: $MSG%0A$L%0A${Server}%0A$L"

    curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
        -d "chat_id=$TELEGRAM_CHAT_ID" \
        -d "parse_mode=HTML" \
        -d "text=CI/CD Pipeline Status: $1%0A$MSG"
}

failure_message="Pipeline has failed! Please investigate."

if [[ "$1" == "Success" ]];
then
    alert $1
else
    alert $failure_message
fi




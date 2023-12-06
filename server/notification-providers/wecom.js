const NotificationProvider = require("./notification-provider");
const axios = require("axios");
const { DOWN, UP } = require("../../src/util");

class WeCom extends NotificationProvider {

    name = "WeCom";

    async send(notification, msg, monitorJSON = null, heartbeatJSON = null) {
        let okMsg = "Sent Successfully.";

        try {
            let WeComUrl = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=" + notification.weComBotKey;
            let config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            let body = this.composeMessage(heartbeatJSON, msg);
            await axios.post(WeComUrl, body, config);
            return okMsg;
        } catch (error) {
            this.throwGeneralAxiosError(error);
        }
    }

    /**
     * Generate the message to send
     * @param {Object} heartbeatJSON Heartbeat details (For Up/Down only)
     * @param {string} msg General message
     * @returns {Object}
     */
    composeMessage(heartbeatJSON, msg) {
        let title;
        if (msg != null && heartbeatJSON != null && heartbeatJSON["status"] === UP) {
            title = "SLO Monitor Up";
        }
        if (msg != null && heartbeatJSON != null && heartbeatJSON["status"] === DOWN) {
            title = "SLO Monitor Down";
        }
        if (msg != null) {
            title = "SLO Monitor Message";
        }
        return {
            msgtype: "text",
            text: {
                content: title + msg
            }
        };
    }
}

module.exports = WeCom;

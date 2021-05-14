class PubSubManager{
    constructor(){
        this.channels = {
            start_game: {
                message: '',
                subscribers: [],
            },
            join_game: {
                message: '',
                subscribers: [],
            },
            serve_card: {
                message: '',
                subscribers: [],
            }
        }
        // THIS WILL 3rd Party Broker
        this.brokerID = setInterval(()=>{ console.log("PUBSUB manager")}, 1000)
    }

    // subscribe to a channel
    subscribe(subscriber, channel){
        console.log(`subscribing to ${channel}`);
        this.channels[channel].subscribers.push(subscriber);
    }

    // publish to a channel
    publisher(publisher, channel, message){
        this.channels[channel].message.push(message);
    }

    // broker: this work will be done by redis
    broker(handleMessage){
        for (const channel in this.channels){
            if (this.channels.hasOwnProperty(channel)){
                const channelObj = this.channels[channel];

                if (channelObj.message){
                    console.log(`found message: ${channelObj.message} in ${channel}`);
                    //  TODO: evaluate the message to sent
                    handleMessage(channelObj.message, channelObj.subscribers);
                    channelObj.message = '';
                }

            }
        }
    }

}

module.exports ={ PubSubManager}
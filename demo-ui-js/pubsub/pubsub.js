class PubSubManager{
    constructor(handleMessage){
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
            },
            // TODO: start from here.
            gamID :{

            }
        }
        this.handleMessage = handleMessage
        // THIS WILL 3rd Party Broker
        this.brokerID = setInterval(()=>{ this.broker()}, 1000)
    }

    createChannel(channelName){
        let newChannel = {}
        newChannel[channelName] = { message:'', subscribers: []}
        this.channels = Object.assign(this.channels, newChannel)
    }

    // subscribe to a channel
    subscribe(subscriber, channel){
        console.log(`subscribing to ${channel}`);
        this.channels[channel].subscribers.push(subscriber);
    }

    // publish to a channel
    publisher(publisher, channel, message){
        this.channels[channel].message = message;
    }

    // broker: this work will be done by redis
    broker(){
        for (const channel in this.channels){
            if (this.channels.hasOwnProperty(channel)){
                const channelObj = this.channels[channel];

                if (channelObj.message){
                    console.log(`found message: ${channelObj.message} in ${channel}`);
                    //  TODO: evaluate the message to sent
                    this.handleMessage(channelObj.message, channelObj.subscribers);
                    channelObj.message = '';
                }

            }
        }
    }

}

module.exports ={ PubSubManager}
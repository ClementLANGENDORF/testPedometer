import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux'
import GoogleFit from 'react-native-google-fit';
import {AnimatedCircularProgress} from 'react-native-circular-progress';


// const options = {
//     startDate: "2017-01-01T00:00:17.971Z",  // required ISO8601Timestamp
//     endDate: (new Date()).toISOString()     // required ISO8601Timestamp
// };
class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            currentSteps: null,
            spendSteps: 0,
        };

    }

    componentDidMount() {

        GoogleFit.onAuthorize(() => {
            console.log('succes');
            this.setState({isLoad: true});
            console.log(this.state.isLoad);
            this.getSteps();


        });
        GoogleFit.onAuthorizeFailure(() => {
            console.log('AUTH ERROR');
        });

        GoogleFit.authorize();

    }

    loadStep() {
        this.interval = setInterval(() => {
            console.log(this.state.currentSteps, this.state.isLoad);
            if (this.state.isLoad === true) {
                console.log('more steps');
                this.getSteps()
            } else {
                console.log('else')
            }
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getSteps = () => {

        const options = {
            startDate: "2017-01-01T00:00:17.971Z",  // required ISO8601Timestamp
            endDate: (new Date()).toISOString()     // required ISO8601Timestamp
        };

        GoogleFit.getDailyStepCountSamples(options, (err, res) => {
            if (err) {
                throw err;
            } else {
                console.log((new Date()).toISOString() );
                console.log(res);
                const steps = res[0].steps;
                this.setState({currentSteps: steps[steps.length - 1].value});
            }
        });
    };
    _dons = () => {
        this.setState({
            spendSteps: this.state.spendSteps + 250,
        });
    };

    render() {
        console.log(new Date());
        console.log((new Date().toUTCString()));
        return (
            <View style={styles.container}>
                <AnimatedCircularProgress
                    size={150}
                    width={10}
                    rotation={-360}
                    duration={500}
                    fill={(this.state.currentSteps - this.state.spendSteps) / 4000 * 100}
                    tintColor="rgb(225,88,55)"
                    backgroundColor="#3d5875">
                    {
                        (fill) => (
                            <Text style={styles.instructions}>
                                {this.state.currentSteps - this.state.spendSteps}
                            </Text>
                        )
                    }
                </AnimatedCircularProgress>

                <View
                    style={{position: 'absolute', bottom: 50}}>
                    <Button

                        onPress={() => this._dons()}
                        title="soustraire"
                        color="rgb(225,88,55)"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(68,184,225)',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


const mapStateToProps = (state) => {
    return state
};

export default connect(mapStateToProps)(HomeScreen)

//export default HomeScreen
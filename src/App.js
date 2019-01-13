import React, {Component} from 'react';
import './App.css';
import * as artifact from './contracts/ToDo'



class App extends Component {

    constructor(props) {
        super(props);

        window.tronWeb.setDefaultBlock('latest');

        this.contract = null;
        this.state = {
            address : null,
            balance : null,
            contract : null,
            tokenBalance: null,
            ids:1,
        }
    }

    async componentDidMount() {

        let tronWeb = window.tronWeb;
        this.setState({address : tronWeb.defaultAddress.base58});
        let address = tronWeb.address.fromHex(artifact.networks['*'].address);
        console.log("componentDidMount 合约信息: ", artifact.abi, artifact.networks['*'].address, address)
        this.contract = tronWeb.contract(artifact.abi, address);  //WYH: 根据合约地址， ABI， 得到合约对象！ 
        console.log(this.contract)
        // await this.refreshBalance();  //WYH: 新的 ToDO合约没这些个成员了
    }

    getTask = async () => {
        try {
            if (!this.contract) { console.log("abort...., contract instance is null");}
            let count = await  this.contract.getTaskCount().call();
            console.log("count: ", count);
          } catch (error) {
              console.log(error)
              throw(error);
          };
    }
   addTask = async () => {
        console.log("addTask..... ")
        console.log("tronweb: ",  window.tronWeb);
        // this.contract && this.contract.addTask(1, "swimming", "tomorrow").send().watch((err, event) => {
        //     if(err)
        //         return console.error('Error with "Message" event:', err);

        //     console.group('New event received');
        //     console.log('- Event :', event); 
        //     console.groupEnd();
        // });

        this.setState({ids: this.state.ids + 1})
        try {
            await this.contract && this.contract.addTask(this.state.ids, "swimming", "tomorrow").send({
                shouldPollResponse: false
            }, function (err, result) {
                
            });
          } catch (error) {
              console.log(error)
              throw(error);
          };

    }
    render() {
        return (
            <div className="App">
                   <div className="heading">
                        <h1>ToDo DApp</h1>
                            <h2>Example Truffle Dapp</h2>
                    </div>
                    <div id='form'>
                            <div><label>Id:</label><input type="text" id="id" placeholder="e.g., 1"/></div>
                            <div><label>Task:</label><input type="text" id="task" placeholder="e.g., Go to Gym"/></div>
                            <div><label>Timing:</label><input type="text" id="time" placeholder="e.g., 6 am"/></div>
                            <div className="buttondiv">
                            <button id="addTask" onClick={this.addTask}>Add</button>
                            </div>
                    </div>
                    <div className="table-cont">
                        <table id="taskTable">
                            <thead>
                                <tr>
                                <th>Id</th>
                                <th>Task</th>
                                <th>Timing</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <div>
                    <label>Id:</label><input type="text" id="get_id" placeholder="e.g., 1"/>
                    <button id="getTask" onClick={this.getTask}>Get</button>
                    </div>
                </div>
        );
    }
}

export default App;

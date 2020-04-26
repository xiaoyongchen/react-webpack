require('./test/index.scss');
import React, {
    Component
} from "react";
import ReactDOM from "react-dom";
import Main from './main.tsx';
console.log(Main);

class Index extends Component {

    render() {
        return <div >
            Hello world </div>
    }
}

ReactDOM.render( < Index / > , document.getElementById("app"));

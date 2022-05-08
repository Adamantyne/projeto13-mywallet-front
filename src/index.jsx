import ReactDOM from 'react-dom';

import App from './Components/App';

import "./assets/reset.css";

function Root() {
    return (
        <App />
    );
}
const elemento = document.querySelector(".root");
ReactDOM.render(<Root />, elemento);
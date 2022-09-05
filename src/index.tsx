import { createRoot } from 'react-dom/client';
import './index.css'
import {AppWithRedux} from "./AppRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";


const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>

);
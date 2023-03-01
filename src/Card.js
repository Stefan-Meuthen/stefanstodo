import "./Card.css";
import { useState } from "react";
import ABI from "./ABI.json";
import { ethers } from "ethers";

function Card(props) {

    const [checked, setChecked] = useState(props.done)

    const toggle = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x2efCe41BAED3c2B91AC111d89e215bA48162B841", ABI, signer);

        const toggleContract = await contract.toggleTask(props.id);

        const receipt = await toggleContract.wait();
        if (receipt.confirmations > 0) {
            setChecked(!checked);
        }
    }

    return (
        <div className="ToDoItem">
            <p>{props.Name} </p>
            <input onClick={toggle} type="checkbox" checked={checked} />
        </div>
    );
}

export default Card;
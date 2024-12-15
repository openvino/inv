import { ethers } from "ethers";
import { invAbi } from "./abi";

const address = import.meta.env.VITE_INV_CONTRACT;

export const invContract = async (signer) => {
	console.log("ADDRESSSSSSSSSSSSSSSSSSSS", address);
	console.log("SIGNER:", signer);

	const contractReader = new ethers.Contract(address, invAbi, signer);
	console.log("CONTRACT READER:", contractReader);

	return contractReader;
};

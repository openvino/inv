import "./App.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./components/ui/button";
import {
	Form,
} from "./components/ui/form";
import { defineChain, sepolia } from "thirdweb/chains";
import { client } from "./config/thirdwebClient";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { getContract, prepareContractCall, sendTransaction } from "thirdweb";
import { invAbi } from "./utils/abi";
import { toast } from "react-hot-toast";
import CryptoJS from "crypto-js";
import CustomFormField from "./components/CustomFormField/CustomFormField";

function App() {
	const account = useActiveAccount();

	const contract = getContract({
		client: client,
		chain: sepolia,
		address: import.meta.env.VITE_INV_CONTRACT,
		abi: invAbi,
	});

	const formSchema = z.object({
		bodega: z
			.string()
			.min(1, { message: "El nombre de la bodega es obligatorio" }),
		botella: z
			.string()
			.min(1, { message: "El nombre de la botella es obligatorio" }),
		cobre: z.string().min(1, { message: "El valor de cobre es obligatorio" }),
		cadmio: z.string().min(1, { message: "El valor de cadmio es obligatorio" }),
		arsenico: z
			.string()
			.min(1, { message: "El valor de arsénico es obligatorio" }),
		plomo: z.string().min(1, { message: "El valor de plomo es obligatorio" }),
		zinc: z.string().min(1, { message: "El valor de zinc es obligatorio" }),
		acidoVolatil: z.string().min(1, { message: "El valor de acido volátil es obligatorio" }),
	});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			bodega: "Costaflores",
			botella: "MTB20",
			cobre: "5",
			cadmio: "5",
			arsenico: "5",
			plomo: "5",
			zinc: "5",
			acidoVolatil: "5",
		},
	});
	const generateHash = (data) => {
		const concatenatedData = `${data.botella}&${data.bodega}&${data.cobre}&${data.cadmio}&${data.plomo}&${data.arsenico}&${data.zinc}`;

		console.log(concatenatedData);


		const hash = CryptoJS.SHA256(concatenatedData).toString(CryptoJS.enc.Hex);
		return `0x${hash}`;
	};

	const onSubmit = async (data) => {
		try {
			const id = `${data.botella}-${data.bodega}`;
			const hash = generateHash(data);

			console.log("ID generado:", id);
			console.log("Hash generado:", hash);
			console.log("CONTRACT:", contract);
			const transaction = prepareContractCall({
				contract,
				method: "storeData",
				params: [id, hash],
			});
			const { transactionHash } = await sendTransaction({
				account,
				transaction,
			});
			console.log("Transacción enviada:", transactionHash);
			toast.success("Datos registrados correctamente en la blockchain.");
		} catch (error) {
			console.error("Error al interactuar con el contrato:", error);
			toast.error("Ocurrió un error al registrar los datos.");
		}
	};

	return (
		<div className="min-h-screen bg-blue-100">
			{/* Header */}
			<header
				className="flex flex-col md:flex-row md:items-center justify-between px-8"
				style={{
					height: "auto", // Para que se ajuste automáticamente a la altura del contenido
					backgroundColor: "rgb(55, 188, 237)",
					padding: "20px",
				}}
			>
				<div className="flex flex-row justify-between items-center md:justify-start md:gap-4">
					<img src="./logo_inv3.png" alt="Logo" className="h-16 md:h-20" />
					<div className="md:hidden">
						<ConnectButton
							client={client}
							chain={defineChain(sepolia)}
							connectButton={{
								label: "Conectar Wallet",
								style: {
									background: "rgb(55, 188, 237)",
									color: "white",
									fontSize: "14px",
									padding: "8px 16px",
									borderRadius: "6px",
									boxShadow:
										"0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
									cursor: "pointer",
									border: "none",
								},
							}}
						/>
					</div>
				</div>

				<h1 className="text-white text-xl mt-4 md:mt-0 font-bold text-center">
					Registro de productos
				</h1>

				<div className="hidden md:block">
					<ConnectButton
						client={client}
						chain={defineChain(sepolia)}
						connectButton={{
							label: "Conectar Wallet",
							style: {
								background: "rgb(55, 188, 237)",
								color: "white",
								fontSize: "18px",
								padding: "10px 20px",
								borderRadius: "8px",
								boxShadow:
									"0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
								cursor: "pointer",
								border: "none",
							},
						}}
					/>
				</div>
			</header>

			{/* Main Content */}
			{!account?.address ? (
				<div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
					<ConnectButton
						client={client}
						chain={defineChain(sepolia)}
						connectButton={{
							label: "Conectar Wallet",
							style: {
								background: "rgb(55, 188, 237)",
								color: "white",
								fontSize: "18px",
								padding: "10px 20px",
								borderRadius: "8px",
								boxShadow:
									"0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
								cursor: "pointer",
								border: "none",
							},
						}}
					/>
				</div>
			) : (
				<div className="flex items-center justify-center p-4">
					<div className="w-3/4 bg-white rounded-lg shadow-md">
						<div className="p-6">
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="space-y-6"
								>
									<h2 className="text-lg font-bold mt-4">
										Bodega y nombre de la botella
									</h2>
									{/* Bodega y Nombre de la botella */}
									<div className="grid grid-cols-2 gap-4">

										<CustomFormField
											control={form.control}
											name="bodega"
											type="text"
											label="Bodega"
											placeholder="Nombre de la bodega" />

										<CustomFormField
											control={form.control}
											name="botella"
											type="text"
											label="Nombre de la botella"
											placeholder="Nombre de la botella" />

									</div>

									<h2 className="text-lg font-bold mt-4">Análisis del vino</h2>
									<div className="grid grid-cols-2 gap-4">

										<CustomFormField
											control={form.control}
											name="cobre"
											type="text"
											label="Cobre (mg/L)"
											placeholder="Ingrese valor" />

										<CustomFormField
											control={form.control}
											name="cadmio"
											type="text"
											label="Cadmio (mg/L)"
											placeholder="Ingrese valor" />

										<CustomFormField
											control={form.control}
											name="arsenico"
											type="text"
											label="Arsénico (mg/L)"
											placeholder="Ingrese valor" />

										<CustomFormField
											control={form.control}
											name="plomo"
											type="text"
											label="Plomo (mg/L)"
											placeholder="Ingrese valor" />

										<CustomFormField
											control={form.control}
											name="zinc"
											type="text"
											label="Zinc (mg/L)"
											placeholder="Ingrese valor" />


										<CustomFormField
											control={form.control}
											name="acidoVolatil"
											type="text"
											label="Acidez Volátil (mg/L)"
											placeholder="Ingrese valor" />



									</div>

									<div className="flex justify-end">
										<Button
											className="bg-[#37bced] text-white w-40 h-10"
											type="submit"
										>
											Registrar
										</Button>
									</div>
								</form>
							</Form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;

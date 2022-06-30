const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();
	const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
	const waveContract = await waveContractFactory.deploy({
		value: hre.ethers.utils.parseEther("0.1"),
	});
	await waveContract.deployed();
	console.log(`Deployed WavePortal Contract at ${waveContract.address}`);

	let contractBalance = await hre.ethers.provider.getBalance(
		waveContract.address
	);
	console.log(
		"Contract balance:",
		hre.ethers.utils.formatEther(contractBalance)
	);

	let waveCount;
	waveCount = await waveContract.getTotalWaves();

	let waveTxn = await waveContract.wave("A Message!");
	await waveTxn.wait();

	waveCount = await waveContract.getTotalWaves();

	console.log(
		"Contract balance:",
		hre.ethers.utils.formatEther(contractBalance)
	);
	let allWaves = await waveContract.getAllWaves();

	console.log(allWaves);

	waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

runMain();

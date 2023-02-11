import { ethers, run } from 'hardhat';

async function main() {
	const CryptoDevToken = await ethers.getContractFactory('CryptoDevToken');
	const cryptoDevToken = await CryptoDevToken.deploy(
		'0x97e1Ea291Cb581228Aac933609AB63Fe1ECc5D68'
	);

	await cryptoDevToken.deployed();

	console.log(`cryptoDevToken deployed to ${cryptoDevToken.address}`);
	console.log('Sleeping.....');
	// Wait for etherscan to notice that the contract has been deployed
	await sleep(40000);

	// Verify the contract after deploying
	await run('verify:verify', {
		address: cryptoDevToken.address,
		constructorArguments: ['0x97e1Ea291Cb581228Aac933609AB63Fe1ECc5D68'],
	});
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

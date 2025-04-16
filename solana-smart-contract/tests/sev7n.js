const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("sev7n", () => {
  /* create and set a Provider */
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.sev7n;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize( );
    console.log("Your transaction signature", tx);
  });



  it("Play over_seven", async () => {
    const baseAccount = _baseAccount;
    await program.rpc.over_seven({
      amount: 1000000,
    });
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Dice 1: ', account.dice1.toString());
    console.log('Dice 2: ', account.dice2.toString());
    assert.ok(account.dice1.toString() > 0);
  });
});

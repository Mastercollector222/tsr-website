import { useState, useEffect } from 'react';
import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import { getFlowBalance, getTSRBalance } from '../cadence/scripts/get-balances';

export function useTokenBalances(address) {
  const [flowBalance, setFlowBalance] = useState('0.0');
  const [tsrBalance, setTsrBalance] = useState('0.0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBalances() {
      if (!address) {
        console.log('No address provided, skipping balance fetch');
        setLoading(false);
        return;
      }

      console.log('Fetching balances for address:', address);
      setLoading(true);
      setError(null);

      try {
        // Fetch Flow balance
        const flowBal = await fcl.decode(
          await fcl.send([
            fcl.script(getFlowBalance),
            fcl.args([fcl.arg(address, t.Address)])
          ])
        );
        console.log('Flow balance fetched:', flowBal);
        setFlowBalance(flowBal?.toString() || '0.0');

        // Fetch TSR balance
        const tsrBal = await fcl.decode(
          await fcl.send([
            fcl.script(getTSRBalance),
            fcl.args([fcl.arg(address, t.Address)])
          ])
        );
        console.log('TSR balance fetched:', tsrBal);
        setTsrBalance(tsrBal?.toString() || '0.0');
      } catch (err) {
        console.error('Error fetching balances:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBalances();
  }, [address]);

  return { flow: flowBalance, tsr: tsrBalance, loading, error };
}

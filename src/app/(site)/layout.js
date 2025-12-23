import LayoutShell from "../../components/LayoutShell";
import { Web3Provider } from "../../components/web3/Web3Provider";

export default function SiteLayout({ children }) {
  return (
    <Web3Provider>
      <LayoutShell>{children}</LayoutShell>
    </Web3Provider>
  );
}

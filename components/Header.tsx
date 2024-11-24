import Link from "next/link";
import { Container } from "./Container";
import Button from "./UI/Button";
import ConnectBtn from "./WalletConnection/ConnectBtn";

export default function Header() {
  return (
    <header className="absolute top-0 w-full z-10">
      <Container padding>
        <div className="flex justify-between items-center h-[--header-height] p-5 ">
          <div className="font-bold text-[42px]">
            <Link href="/">
              <h1>Doginal Bot</h1>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-5 text-2xl">
              <Link className="hover:text-white duration-200" href="/">
                Home
              </Link>
              <Link className="hover:text-white duration-200" href="/creators">
                Creator
              </Link>
            </div>
            <ConnectBtn />
          </div>
        </div>
      </Container>
    </header>
  );
}

import { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { QRCode } from "react-qrcode-logo";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegCopy, FaRegCheckCircle } from "react-icons/fa";
import { Input } from "@nextui-org/react";
import ConnectBtn from "../WalletConnection/ConnectBtn";
import { toast } from "react-toastify";
import { WalletContext } from "@/context/wallet";

export default function OrderModal({
  isOpen,
  onOpenChange,
  orderInfo,
  amount,
  submitOrder,
  setReceivedAddress,
  receivedAddress,
}) {
  const [isCopy, setIsCopy] = useState(false);
  const [step, setStep] = useState(1);
  const [isOrderSubmitLoading, setIsOrderSubmitLoading] = useState(false);
  const wallet = useContext(WalletContext);

  async function handleSubmitOrder() {
    if (!receivedAddress) {
      return toast.warn("Please input received address");
    }
    setIsOrderSubmitLoading(true);
    await submitOrder();
    setIsOrderSubmitLoading(false);
      setStep(2);
  }

  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  function showModalBody(onClose) {
    if (step === 1) {
      return (
        <>
          <ModalBody>
            <div className="flex items-center justify-between">
              <p>Collection Name:</p>
              <p>Doge Ordinal</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Amount:</p>
              <p>{amount}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Price:</p>
              <p>{orderInfo?.price} Doge</p>
            </div>
            <div>
              <Input
                isClearable
                value={receivedAddress}
                onChange={(e) => setReceivedAddress(e.target.value)}
                type="text"
                label="Received Address"
                placeholder="Enter received address"
                onClear={() => setReceivedAddress("")}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={handleSubmitOrder}
              isLoading={isOrderSubmitLoading}
            >
              Submit Order
            </Button>
          </ModalFooter>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <ModalBody>
            <div className="flex flex-col gap-4 text-gray-00 items-center">
              <div className="flex justify-around w-full">
                <div>
                  <span>Status: </span>
                  <span className="text-white">{status}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="text-lg">Scan the QRCode to pay:</p>
              <QRCode
                value={orderInfo?.payAddress}
                logoImage="/img/dogecoin-doge-logo.png"
                logoHeight={50}
                logoWidth={50}
              />
            </div>
            <div className="text-center">
              <p className="text-lg">
                Please send {orderInfo?.price} Doge to this address{" "}
              </p>
              <div className="flex gap-3 justify-center items-center">
                <p className="text-white">{orderInfo?.payAddress}</p>
                {!isCopy ? (
                  <CopyToClipboard
                    text={orderInfo?.payAddress}
                    onCopy={() =>
                      setIsCopy((prevState) => {
                        return !prevState;
                      })
                    }
                  >
                    <FaRegCopy className="cursor-pointer hover:text-white" />
                  </CopyToClipboard>
                ) : (
                  <FaRegCheckCircle className="cursor-pointer text-green-500" />
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            {wallet.isConnected ? (
              <Button
                color="danger"
                onClick={() => wallet.PayDoge(4.2, orderInfo?.payAddress)}
              >
                Pay with Wallet
              </Button>
            ) : (
              <ConnectBtn />
            )}
          </ModalFooter>
        </>
      );
    }
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl text-white">
              Inscribing Order
            </ModalHeader>
            {showModalBody(onClose)}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

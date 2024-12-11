import { useState, useContext } from "react";
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
import { WalletContext } from "@/context/wallet";

export default function OrderStatusModal({ isOpen, onOpenChange, orderInfo }) {
  const [isCopy, setIsCopy] = useState(false);
  const wallet = useContext(WalletContext);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl text-white">
              Inscribing Order
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4 text-gray-00 items-center">
                <div>
                  <span className="text-xl">OrderId: </span>
                  <span className="text-xl text-white">{orderInfo.id}</span>
                </div>
                <div className="flex justify-around w-full">
                  <div>
                    <span>Quantity: </span>
                    <span className="text-white">{orderInfo.amount}</span>
                  </div>
                  <div>
                    <span>Status: </span>
                    <span className="text-white">{orderInfo.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <p className="text-lg">Scan the QRCode to pay:</p>
                <QRCode
                  value={orderInfo.address}
                  logoImage="/img/dogecoin-doge-logo.png"
                  logoHeight={50}
                  logoWidth={50}
                />
              </div>
              <div className="text-center">
                <p className="text-lg">
                  Please send {orderInfo.amount} Doge to this address{" "}
                </p>
                <div className="flex gap-3 justify-center items-center">
                  <p className="text-white">{orderInfo.payAddress}</p>
                  {!isCopy ? (
                    <CopyToClipboard
                      text={orderInfo.payAddress}
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
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {orderInfo.status === "pending" && (
                <Button
                  color="danger"
                  onClick={() => wallet.PayDoge(4.1, orderInfo.payAddress )}
                >
                  Pay with Wallet
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

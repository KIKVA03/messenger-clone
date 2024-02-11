"use client";
import Modal from "@/app/components/Modal";
import Image from "next/image";
import React from "react";

type Props = {
    isOpen?: boolean;
    src?: string | null;
    onClose: () => void;
};

const ImageModal = ({ onClose, isOpen, src }: Props) => {
    if (!src) {
        return null;
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-80 h-80">
                <Image src={src} alt="image" fill className="object-cover" />
            </div>
        </Modal>
    );
};

export default ImageModal;

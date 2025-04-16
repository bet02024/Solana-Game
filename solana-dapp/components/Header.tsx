import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useProgram } from "../hooks/useProgram";
import styles from "../styles/Home.module.css";
import FAQModal from "./components/FAQModal";
import HowToPlayModal from "./components/HowToPlayModal";
import ResponsabilityModal from "./components/ResponsabilityModal";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";


const Header: NextPage = () => {
  const { program, wallet, connection, provider, balance } = useProgram();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showResponsabilityModal, setShowResponsabilityModal] = useState(false)
  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false)
  const [showFAQModal, setShowFAQModal] = useState(false)

  return (
    <div className='absolute right-0 left-0 top-0 z-20'>
      <ResponsabilityModal isModalOpen={showResponsabilityModal} closeModal={() => setShowResponsabilityModal(false)} />
      <HowToPlayModal isModalOpen={showHowToPlayModal} closeModal={() => setShowHowToPlayModal(false)} />
      <FAQModal isModalOpen={showFAQModal} closeModal={() => setShowFAQModal(false)} />
      <nav className=" px-2 py-3">
        <div className="flex w-full justify-between ">

          <section className="lg:invisible">
            <div
              className="HAMBURGER-ICON space-y-2 bg-navbar py-2 px-2 rounded"
              onClick={() => setIsNavOpen((prev) => !prev)}
            >
              <span className="block h-0.5 w-8 bg-white"></span>
              <span className="block h-0.5 w-8 bg-white"></span>
              <span className="block h-0.5 w-8 bg-white"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav bg-navbar" : "hideMenuNav"}>
              <div
                className="absolute top-0 left-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-8 w-8 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="flex flex-col items-center justify-between ">
                <li className="mb-2 flex flex-row justify-center items-center">
                  <p className='navbar-text cursor-pointer'>About</p>
                </li>
                <li className="mb-2 flex flex-row justify-center items-center">
                  <p className='navbar-text cursor-pointer' onClick={() => setShowFAQModal(true)}>FAQ</p>
                </li>
                <li className="mb-2 flex flex-row justify-center items-center">
                  <p className='navbar-text cursor-pointer' onClick={() => setShowResponsabilityModal(true)}>Roll Responsibly</p>
                </li>
                <li className="mb-2 flex flex-row justify-center items-center">
                  <p className='navbar-text cursor-pointer' onClick={() => setShowHowToPlayModal(true)}>How to play</p>
                </li>
                <li className="mb-2 flex flex-row justify-center items-center">
                  <a className='footer-link' href='https://mixpanel.com/public/Q731WuydtZJTuxZJp1tuze' target='_blank' rel="noreferrer">
                    <p className='navbar-text cursor-pointer'>Stats</p>
                  </a>
                </li>
                <li className="mb-2 flex flex-row justify-center items-center">
                  <p className='navbar-text cursor-pointer'>Top Streaks</p>
                </li>
          </ul>
        </div>
      </section>
      <div className="flex">
        {
          (wallet && program && connection) &&
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
            rounded-lg mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700
            dark:focus:ring-blue-800">
            <WalletMultiButton />
          </button>
        }
      </div>
    </div>
      </nav >
    </div >
  );
};

export default Header;

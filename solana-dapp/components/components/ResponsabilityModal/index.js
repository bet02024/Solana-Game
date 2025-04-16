import React from 'react'
import Modal from 'react-modal'
import ButtonGradient from '../ButtonGradient'


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(0,0,0)',
    maxHeight: '80vh',
    width: '100vw',
    maxWidth: '80vw',
  },
};

const ResponsabilityModal = ({ isModalOpen = false, closeModal = () => { } }) => {
  Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.9)';
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <p className="responsibly-title">ROLL RESPONSIBLY</p>
      <p className="responsibly-text">LBDH is a fun game on Solana and we want all of our players to play responsibly. Please only play whit SOL your are comfortable parting with that wh'ont impact you well-being.</p>

      <p className="responsibly-title mt-5">RESOURCES</p>
      <p className="responsibly-text">Call 1-800-0000000</p>
      <p className="responsibly-text">Chat ncpgambling.org/chat</p>
      <p className="responsibly-text">Text 01-800-522-4700</p>

      <p className="responsibly-title mt-5">DO I HAVE A ROLLING PROBLEM?</p>
      <p className="responsibly-text">Rolling problem includes all behavior patterns that compromise, disrup, or damage any person, family, or vocational pursuits. Symtoms include increasing preocupation with rolling, a need to roll more and more frequently, restlessness or irritability when attemting to stop, "chasing" losses, and loss of control manifested by continuation of the rolling behavior in spite of mounting, serious, and/or negative consequence.</p>
      <div className="flex flex-row items-center justify-center mt-5 mb-10">
        <ButtonGradient
          text='OK!'
          onClick={closeModal}
          style={{ width: 500 }}
        />
      </div>
    </Modal>
  )
}

export default ResponsabilityModal
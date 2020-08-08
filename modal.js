class Modal extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this._ConfirmButton;
        this._CancelButton;
        this._BackDrop;
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background:rgba(0,0,0,0.75); 
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                }


                #modal {
                    position: fixed;
                    top 10vh;
                    left: 25%;
                    width: 50%;
                    z-index: 100;
                    background: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.26);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.3s ease-out;
                }

                :host([open]) #backdrop, :host([open]) #modal{
                    opacity: 1;
                    pointer-events: all;
                }

                :host([open]) #modal{
                    top: 15vh;
                }

                #actions{
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }

                #actions button{
                    margin: 0 0.25rem;

                }

                header {
                    padding: 1rem;
                    border-bottom: 1px solid #ccc;
                }

               ::slotted (h1) {
                    font-size: 1.25rem;
                    margin: 0;
                }

                #main {
                    padding: 1rem;
                }

            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                   <slot name="title"></slot>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button id="cancel-btn">Cancel</button>
                    <button id="confirm-btn">Confirm</button
                </section>
            </div>
        `
    }

    connectedCallback(){
        this._CancelButton = this.shadowRoot.querySelector("#cancel-btn");
        this._ConfirmButton = this.shadowRoot.querySelector("#confirm-btn");
        this._BackDrop = this.shadowRoot.querySelector("#backdrop");

        this._CancelButton.addEventListener('click', this._cancel.bind(this));
        this._ConfirmButton.addEventListener('click', this._confirm.bind(this));
        this._BackDrop.addEventListener('click', this._cancel.bind(this));
    }

    disconnectedCallback(){
        this._CancelButton.removeEventListener('click');
        this._ConfirmButton.removeEventListener('click');
        this._BackDrop.removeEventListener('click');
    }

    open(){
        this.setAttribute('open', '');
        this.isOpen = true;
    }

    _cancel(event){
        this._hide();
        const cancelEvent = new Event('cancel', { bubbles: true, composed: true }); // bubbles will bubble up the event, compose will let it leave the shadow dom
        event.target.dispatchEvent(cancelEvent);
    }

    _confirm(){
        this._hide();
        const confirmEvent = new Event('confirm'); 
        this.dispatchEvent(confirmEvent); //this way we don't have to use bubbles and confirm
    }

    _hide(){
        if(this.hasAttribute('open')){
            this.removeAttribute('open');
        }
        this.isOpen = false;
    }
}

customElements.define("rm-modal", Modal);
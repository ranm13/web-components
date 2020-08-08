class Modal extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this._ConfirmButton;
        this._CancelButton;
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
                    top 15vh;
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
                }

                :host([open]) #backdrop, :host([open]) #modal{
                    opacity: 1;
                    pointer-events: all;
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
                }

                header h1 {
                    font-size: 1.25rem;
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

    // attributeChangedCallback(name, oldVal, newVal){
    //     if(name === 'open'){
    //         if(this.hasAttribute('open')){
    //             this.shadowRoot.querySelector('')
    //         }
    //     }
    // }

    // static get observedAttributes(){
    //     return['open'];
    // }
    connectedCallback(){
        this._CancelButton = this.shadowRoot.querySelector("#cancel-btn");
        this._ConfirmButton = this.shadowRoot.querySelector("#confirm-btn");

        this._CancelButton.addEventListener('click', this._cancel.bind(this));
        this._ConfirmButton.addEventListener('click', this._confirm.bind(this));
    }

    disconnectedCallback(){
    }

    open(){
        this.setAttribute('open', '');
        this.isOpen = true;
    }

    _cancel(){
        this._hide();
    }

    _confirm(){
        this._hide();
    }

    _hide(){
        if(this.hasAttribute('open')){
            this.removeAttribute('open');
        }
        this.isOpen = false;
    }
}

customElements.define("rm-modal", Modal);
class ToggleInfoButton extends HTMLElement{
    constructor(){
        super();
        this._buttonElement;
        this._infoElement;
        this.isHidden = true;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML=`
            <style>
                #info-box {
                    display: none;
                }
            </style>
            <button>Show</button>
            <p id="info-box">More infos!</p>
        `;
    }

    connectedCallback(){
        this._buttonElement = this.shadowRoot.querySelector('button');
        this._infoElement = this.shadowRoot.querySelector('#info-box');

        this._buttonElement.addEventListener('click', this.toggleInfoBox.bind(this));
    }

    disconnectedCallback(){
        this._buttonElement.removeEventListener('click',this.toggleInfoBox);
    }

    toggleInfoBox(){
        this._infoElement.style.display =  this.isHidden? 'block' : 'none';
        this._buttonElement.textContent = this.isHidden? 'Hide': 'Show';
        this.isHidden = !this.isHidden;
    }

}

customElements.define('rm-toggle-info-button', ToggleInfoButton);
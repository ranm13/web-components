class ToggleInfoButton extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this._buttonElement;
        this._infoElement;
        this.isHidden = true;
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
        this.shadowRoot.appendChild(this._buttonElement);
        this.shadowRoot.appendChild(this._infoElement);
    }

    toggleInfoBox(){
        if (this.isHidden) {
            this._infoElement.style.display = 'block';
            this._buttonElement.textContent = 'Hide';
            this.isHidden = false;
          } else {
            this._infoElement.style.display = 'none';
            this._buttonElement.textContent = 'Show';
            this.isHidden = true;
          }
    }

}

customElements.define('rm-toggle-info-button', ToggleInfoButton);
class Tooltip extends HTMLElement{
    constructor(){
        super();
        this._tooltipContainer;
        this._tooltipText = "default text";
        this.attachShadow({mode: 'open'}); //attached shadow dom tree
    }

    connectedCallback(){
        if(this.hasAttribute('text')){
            this._tooltipText = this.getAttribute('text');
        }
        const tooltipIcon = document.createElement('span');
        tooltipIcon.textContent = ' (?)';
        tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
        tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
    }

    _showTooltip(){
        this._tooltipContainer = document.createElement("div");
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip(){
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define("rm-tooltip", Tooltip); //by this you define your own html tag - built in js (the name must have dash - )

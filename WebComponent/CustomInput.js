class CustomInput extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.estilo();
      this.render();
    }

    estilo(){
      this.shadowRoot.innerHTML += `
      <style>
      input:invalid {
        border: 2px dashed red;
      }
      
      input:invalid:required {
        background-image: linear-gradient(to right, pink, lightgreen);
      }
      
      input:valid {
        border: 2px solid black;
      }
      </style>
      `;
    }
  

  
    render() {

        let attributesString = '';
        for (let i = 0; i < this.attributes.length; i++) {
            const attr = this.attributes[i];
            if (attr.name === 'required') {
                attributesString += `${attr.name}`;
            }else {
              attributesString += `${attr.name}="${attr.value}"`;
            }

        }

      this.shadowRoot.innerHTML += `
        <input 
          ${attributesString}
        >
      `;
      this.typemangement();      
    }

    typemangement(){
        let form = this.closest('form');
        let inputElement = this.shadowRoot.querySelector('input');
        
        form.addEventListener('submit', (event) => {
          if (!inputElement.reportValidity()) {
            event.preventDefault(); // prevent the form from being submitted if the input is not valid
          }
        });

        switch (this.getAttribute('type')) {
            case 'vacio':
                this.shadowRoot.querySelector('input').addEventListener('change', (event) => {
                    if (event.target.value !== '') {
                        inputElement.setCustomValidity('Por favor, introduce un numero válido.');
                    }else {
                        inputElement.setCustomValidity('');
                    }
                  });
                break;

            case 'entero':
                this.shadowRoot.querySelector('input').addEventListener('input', (event) => {
                    const integerRegex = /^-?\d+$/;
                    if (!integerRegex.test(event.target.value)) {
                    inputElement.setCustomValidity('Por favor, introduce un numero válido.');
                } else {
                    inputElement.setCustomValidity('');
                }

                });
                break;

            case 'email':
                inputElement.addEventListener('change', (event) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(event.target.value)) {
                        inputElement.setCustomValidity('Por favor, introduce un correo electrónico válido.');
                    } else {
                        inputElement.setCustomValidity('');
                    }
 
                });
                break;
                
            case 'reales':
              inputElement.addEventListener('change', (event) => {
                  const realNumberRegex = /^-?\d*(\.\d+)?$/;
                  if (!realNumberRegex.test(event.target.value)) {
                      inputElement.setCustomValidity('Por favor, introduce un número real válido.');
                  } else {
                      inputElement.setCustomValidity('');
                  }
              });
              break;
        }
        
    }
}



  customElements.define('custom-input', CustomInput);

  export default CustomInput;




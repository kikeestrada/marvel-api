import {createCustomElement} from "./helpers";

export const edModal = () => {
	// Imprimir modal
	let printModal = content => {
		// crear contenedor interno
		const modalContentEl = createCustomElement('div', {
				id: 'ed-modal-content',
				class: 'ed-modal-content'
			}, [content]),

			// crear contenedor principal
			modalContainerEl = createCustomElement('div', {
				id: 'ed-modal-container',
				class: 'ed-modal-container'
			}, [modalContentEl]);

		// Imprimir el modal
		document.body.appendChild(modalContainerEl);

		// Remover el modal
		const removeModal = () => document.body.removeChild(modalContainerEl);

		modalContainerEl.addEventListener('click', e => {
			if (e.target === modalContainerEl) removeModal();
		})
	};

	let saludo = `<h1>This is my Modal Component</h1>`;
	document.getElementById('show-modal').addEventListener('click', () => {
		printModal(saludo);
	});

};


/* =========================================================
   50+ Convidados — script principal
   Usado pelo index.html e pelo hist.html
   ========================================================= */

/* ---------- Dados das temporadas ----------
   Para adicionar uma nova temporada, basta incluir um
   objeto novo no INÍCIO da lista (a mais recente primeiro). */
const temporadas = [
	{
		ano: 2022,
		campeao: { time: 'vermelho', img: 'https://i.im.ge/2023/05/18/UBmJzP.Campeao-2022.jpg' },
		vice:    { time: 'azul',     img: 'https://i.im.ge/2023/05/18/UBwoBT.Vice-2022.jpg' }
	},
	{
		ano: 2021,
		campeao: { time: 'azul',     img: 'https://i.im.ge/2023/05/18/UBwjhY.Campeao-2021.jpg' },
		vice:    { time: 'vermelho', img: 'https://i.im.ge/2023/05/18/UBwtHp.Vice-2021.jpg' }
	},
	{
		ano: 2020,
		campeao: { time: 'azul',     img: 'https://i.im.ge/2023/05/18/UBwA1P.Campeao-2020.jpg' },
		vice:    { time: 'vermelho', img: 'https://i.im.ge/2023/05/18/UBwCw1.Vice-2020.jpg' }
	},
	{
		ano: 2019,
		campeao: { time: 'azul',     img: 'https://i.im.ge/2023/05/18/UBwRAc.Campeao-2019.jpg' },
		vice:    { time: 'vermelho', img: 'https://i.im.ge/2023/05/18/UBwWpL.Vice-2019.jpg' }
	},
	{
		ano: 2018,
		campeao: { time: 'vermelho', img: 'https://i.im.ge/2023/05/18/UBwK1G.Campeao-2018.jpg' },
		vice:    { time: 'azul',     img: 'https://i.im.ge/2023/05/18/UBwVwx.Vice-2018.jpg' }
	},
	{
		ano: 2017,
		campeao: { time: 'vermelho', img: 'https://i.im.ge/2023/05/18/UBwzXJ.Campeao-2017.jpg' },
		vice:    { time: 'azul',     img: 'https://i.im.ge/2023/05/18/UBwHiy.Vice-2017.jpg' }
	}
];

const nomesTimes = { azul: '50+ Azul', vermelho: '50+ Vermelho' };

const iconeTrofeu = `
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/>
		<path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>
	</svg>`;

const iconeMedalha = `
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<circle cx="12" cy="15" r="6"/>
		<path d="M8.5 10 6 3h4l2 5M15.5 10 18 3h-4l-2 5"/>
	</svg>`;

/* ---------- Menu mobile ---------- */
const menu = document.getElementById('menu');
const botaoAbrir = document.getElementById('openMenu');
const botaoFechar = document.getElementById('closeMenu');

function alternarMenu(aberto) {
	if (!menu) return;
	menu.classList.toggle('aberto', aberto);
	document.body.classList.toggle('menu-aberto', aberto);
	if (botaoAbrir) botaoAbrir.setAttribute('aria-expanded', String(aberto));
	if (aberto && botaoFechar) botaoFechar.focus();
}

if (botaoAbrir) botaoAbrir.addEventListener('click', () => alternarMenu(true));
if (botaoFechar) botaoFechar.addEventListener('click', () => alternarMenu(false));
if (menu) {
	menu.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => alternarMenu(false));
	});
}

document.addEventListener('keydown', (evento) => {
	if (evento.key === 'Escape' && menu && menu.classList.contains('aberto')) {
		alternarMenu(false);
		if (botaoAbrir) botaoAbrir.focus();
	}
});

/* ---------- Cabeçalho mais escuro ao rolar ---------- */
const cabecalho = document.querySelector('header');

function atualizarCabecalho() {
	if (cabecalho) cabecalho.classList.toggle('rolado', window.scrollY > 10);
}

window.addEventListener('scroll', atualizarCabecalho, { passive: true });
atualizarCabecalho();

/* ---------- Placar de títulos ---------- */
const titulosAzul = document.getElementById('titulos-azul');
const titulosVermelho = document.getElementById('titulos-vermelho');
const resumoPlacar = document.getElementById('placar-resumo');

if (titulosAzul && titulosVermelho) {
	const contar = (time) => temporadas.filter((t) => t.campeao.time === time).length;
	titulosAzul.textContent = contar('azul');
	titulosVermelho.textContent = contar('vermelho');

	if (resumoPlacar && temporadas.length) {
		const anos = temporadas.map((t) => t.ano);
		resumoPlacar.textContent =
			`${temporadas.length} temporadas registradas (${Math.min(...anos)}–${Math.max(...anos)})`;
	}
}

/* ---------- Abas de temporadas ---------- */
const abas = document.getElementById('abas-temporadas');
const painel = document.getElementById('painel-temporada');

function montarCartao(tipo, dados, ano) {
	const ehCampeao = tipo === 'campeao';
	const titulo = ehCampeao ? 'Campeão' : 'Vice-campeão';
	const nome = nomesTimes[dados.time];
	const legenda = `${titulo} ${ano} – ${nome}`;

	return `
		<figure class="cartao cartao--${dados.time} ${ehCampeao ? 'cartao--campeao' : ''}">
			<button class="cartao__foto" type="button" data-img="${dados.img}" data-legenda="${legenda}">
				<img src="${dados.img}" alt="${nome}, ${titulo.toLowerCase()} da temporada ${ano}" loading="lazy">
				<span class="cartao__zoom" aria-hidden="true">Ampliar</span>
			</button>
			<figcaption>
				<strong class="cartao__time">${nome}</strong>
				<span class="selo ${ehCampeao ? 'selo--ouro' : ''}">
					${ehCampeao ? iconeTrofeu : iconeMedalha} ${titulo}
				</span>
			</figcaption>
		</figure>`;
}

function mostrarTemporada(indice, focar = false) {
	const temporada = temporadas[indice];
	const botoes = abas.querySelectorAll('.aba');

	botoes.forEach((botao, i) => {
		const ativo = i === indice;
		botao.setAttribute('aria-selected', String(ativo));
		botao.tabIndex = ativo ? 0 : -1;
	});

	const botaoAtivo = botoes[indice];
	painel.setAttribute('aria-labelledby', botaoAtivo.id);
	if (focar) botaoAtivo.focus();
	botaoAtivo.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });

	painel.innerHTML =
		montarCartao('campeao', temporada.campeao, temporada.ano) +
		montarCartao('vice', temporada.vice, temporada.ano);

	// Reinicia a animação de troca
	painel.classList.remove('trocando');
	void painel.offsetWidth;
	painel.classList.add('trocando');
}

if (abas && painel && temporadas.length) {
	abas.innerHTML = temporadas
		.map((t) => `<button class="aba" type="button" role="tab" id="aba-${t.ano}" aria-controls="painel-temporada">${t.ano}</button>`)
		.join('');

	const botoes = [...abas.querySelectorAll('.aba')];

	botoes.forEach((botao, i) => {
		botao.addEventListener('click', () => mostrarTemporada(i));
	});

	// Navegação pelo teclado (setas, Home e End)
	abas.addEventListener('keydown', (evento) => {
		const atual = botoes.indexOf(document.activeElement);
		if (atual === -1) return;

		let proximo = null;
		if (evento.key === 'ArrowRight') proximo = (atual + 1) % botoes.length;
		if (evento.key === 'ArrowLeft') proximo = (atual - 1 + botoes.length) % botoes.length;
		if (evento.key === 'Home') proximo = 0;
		if (evento.key === 'End') proximo = botoes.length - 1;

		if (proximo !== null) {
			evento.preventDefault();
			mostrarTemporada(proximo, true);
		}
	});

	mostrarTemporada(0);
	painel.classList.remove('trocando');
}

/* ---------- Foto ampliada (lightbox) ---------- */
const lightbox = document.getElementById('lightbox');

if (lightbox && painel) {
	const imagem = lightbox.querySelector('img');
	const legenda = lightbox.querySelector('.lightbox__legenda');
	const fechar = lightbox.querySelector('.lightbox__fechar');

	painel.addEventListener('click', (evento) => {
		const foto = evento.target.closest('.cartao__foto');
		if (!foto) return;

		imagem.src = foto.dataset.img;
		imagem.alt = foto.dataset.legenda;
		legenda.textContent = foto.dataset.legenda;
		lightbox.showModal();
	});

	fechar.addEventListener('click', () => lightbox.close());

	// Fecha ao clicar fora da foto
	lightbox.addEventListener('click', (evento) => {
		if (evento.target === lightbox) lightbox.close();
	});
}

/* ---------- Animação de entrada ao rolar ---------- */
const elementosRevelar = document.querySelectorAll('.revelar');

if ('IntersectionObserver' in window) {
	const observador = new IntersectionObserver((entradas) => {
		entradas.forEach((entrada) => {
			if (entrada.isIntersecting) {
				entrada.target.classList.add('visivel');
				observador.unobserve(entrada.target);
			}
		});
	}, { threshold: 0.15 });

	elementosRevelar.forEach((el) => observador.observe(el));
} else {
	elementosRevelar.forEach((el) => el.classList.add('visivel'));
}

/* ---------- Ano atual no rodapé ---------- */
const anoAtual = document.getElementById('ano-atual');
if (anoAtual) anoAtual.textContent = new Date().getFullYear();
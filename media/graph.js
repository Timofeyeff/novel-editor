const svg = d3.select("#graph").append("svg")
    .attr("width", 800)
    .attr("height", 600);

window.addEventListener('message', (event) => {
    if (event.data.type === 'update') {
        // Логика отрисовки графа с помощью D3.js
        // Пример:
        const nodes = event.data.nodes;
        const links = nodes.flatMap(n => 
            n.links.map(l => ({ source: n.id, target: l.target }))
        );

        // Очистка предыдущего графа
        svg.selectAll("*").remove();

        // Создание силовой симуляции
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(400, 300));

        // Отрисовка связей и узлов
        // ...
    }
});
import * as React from 'react';
import { useState, useEffect } from "react";
import './Especialista.scss';
import { IEspecialistaProps } from './IEspecialistaProps';
import { format, handleDateFnsLocale, HandleError, i18n, MessageBar, MessageBarType, Shimmer, ShimmerElementType } from 'impar-digital-workplace-core-library';
import axios from 'axios';

import { xml2js } from 'xml-js';

export default (props: IEspecialistaProps) => {

  const [loading, setLoading] = useState<boolean>(true);
  const [item, setItem] = useState<any[]>(new Array(0).fill({}));
  const [isOpen, setOpen] = useState(false);
  const [itemLast, setItemAllLast] = useState<any[]>(new Array(0).fill({}));
  const [itemAll, setItemAll] = useState<any[]>(new Array(0).fill({}));

  const [category, setCategory] = useState<any[]>(new Array(0).fill({}));
  const [selectedCategory, setSelectedCategory] = useState<string>("Últimas");

  //EM AMBIENTE DE DESENVOLVIMENTO SÓ CONSEGUIMOS VISUALIZAR COM OS DADOS FAKE ABAIXO
  let xml_FAKE = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:wfw="http://wellformedweb.org/CommentAPI/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
	xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
	>
     
<channel>
        <title>Home -  O Especialista</title>
        <atom:link href="https://oespecialista.com.br/feed/home" rel="self" type="application/rss+xml" />
        <link>https://oespecialista.com.br</link>
        <description>O Especialista</description>
        <lastBuildDate>Fri, 21 Jan 2022 16:24:21 +0000</lastBuildDate>
        <language>pt-BR</language>
        <sy:updatePeriod>hourly</sy:updatePeriod>
        <sy:updateFrequency>1</sy:updateFrequency>
        <generator>https://wordpress.org/?v=5.8.1</generator>

<image>
	<url>https://oespecialista.com.br/wp-content/uploads/2020/12/cropped-android-icon-192x192-2-1-32x32.png</url>
	<title>O Especialista</title>
	<link>https://oespecialista.com.br</link>
	<width>32</width>
	<height>32</height>
</image> 
        
                <item>
                        <title>Conta de luz deve subir mesmo com socorro ao setor elétrico</title>
                        <link>https://oespecialista.com.br/conta-de-luz-deve-subir-mesmo-com-socorro-ao-setor-eletrico/</link>
                        <dc:creator>Redação</dc:creator>
                        <pubDate>Fri, 21 Jan 2022 16:19:38 +0000</pubDate>
                        <category><![CDATA[Economia]]></category>
                        <description><![CDATA[Apesar do pacote de socorro ao setor elétrico, que pode chegar a R$ 15 bilhões, TCU vê risco de aumentos 'expressivos' na tarifa de energia]]></description>
                        <content:encoded><![CDATA[O empréstimo do governo para socorrer as empresas do setor elétrico, somada a outras despesas, tem o risco de acarretar <a href="https://oespecialista.com.br/inflacao-eua-juros/" target="_blank" rel="noopener">aumentos "expressivos" na conta de luz</a> nos próximos anos, alerta o Tribunal de Contas da União (TCU) em relatório enviado ao governo.

O órgão cobra "clareza" e "objetividade" do governo na condução da política tarifária e menciona "estudos prévios deficientes" que não indicam os dados completos do impacto do financiamento na inflação nem ações alternativas para equacionar os problemas financeiros das concessionárias.

Em dezembro, o governo publicou uma medida provisória que abre espaço para um novo socorro ao setor elétrico a fim de evitar um "tarifaço" nas contas de luz agora em 2022, ano de eleições.

O empréstimo será usado para bancar as medidas emergenciais para evitar falhas no fornecimento de energia devido à escassez nos reservatórios de usinas hidrelétricas - e deve ser pago nos anos seguintes.

Não foram detalhados os valores exatos do empréstimo, nem o prazo de pagamento, mas a previsão é que a operação fique em torno de R$ 15 bilhões.
<h3>Acúmulo de reajustes pode pesar na conta de luz dos brasileiros em 2022</h3>
"De alguma maneira, começa-se a formar um acúmulo de aumentos tarifários já em razão de processos tarifários anteriores, Conta-Covid e decisões tomadas durante a crise hidroenergética", diz o relatório.

"Há o risco de o consumidor, nos anos vindouros, estar sujeito a aumentos tarifários expressivos, em razão de efeitos cumulativos de decisões tomadas no passado, como pagamento da Conta-Covid e dessa nova operação de crédito, associada aos regulares reajustes/revisões tarifárias."

Para os técnicos da Corte, a opção pelo empréstimo, se adotada, deveria ser baseada em "estudos, evidências e análises estruturadas para que as alternativas possam ser julgadas de maneira objetiva, sendo possível, assim, verificar se a política adotada representou a alternativa mais vantajosa para tratar o problema, frente a alternativas de solução".

É a quarta vez que o governo recorre a operações financeiras para conter reajustes elevados nas contas de luz ou para socorrer as empresas de distribuição. A última foi em 2020, quando o empréstimo foi autorizado para minimizar os efeitos da pandemia de covid-19 sobre o setor - essa operação, inclusive, já está sendo paga por meio de repasses adicionais às contas de luz. (AE)]]></content:encoded>
                                                                </item>

        
                
                        <item>
                                <title>BR Malls recusa fusão com Aliansce para formar grupo com 69 shoppings</title>
                                <link>https://oespecialista.com.br/br-malls-recusa-fusao-com-aliansce-para-formar-grupo-com-69-shppings/</link>
                                <dc:creator>Redação</dc:creator>
                                <pubDate>Fri, 21 Jan 2022 16:19:38 +0000</pubDate>
                                <category><![CDATA[Negócios]]></category>
                                <description><![CDATA[Conselho de Administração da  BR Malls rejeitou de forma unânime a proposta da Aliansce, alegando que o valor da empresa foi subestimado]]></description>
                                <content:encoded><![CDATA[
<p>A <a href="https://oespecialista.com.br/chip-intel-4004-que-mudou-o-mundo/" target="_blank" rel="noreferrer noopener">Intel </a>anunciou que planeja investir pelo menos US$ 20 bilhões em novas instalações de fabricação de chips em Ohio. O anúncio, segundo o <a href="https://www.wsj.com/articles/intel-to-invest-at-least-20-billion-in-ohio-chip-making-facility-11642750760?mod=hp_lead_pos1" target="_blank" rel="noreferrer noopener">Wall Street Journal</a>, reforça a ambição de produção de semicondutores da empresa, diante da maior demanda por produtos digitais e escassez global diante de impacto logístico da pandemia de covid-19.</p>



<p>A Intel informou que planeja duas novas fábricas de chips nos arredores de Columbus, Ohio, para aumentar o esforço de expansão do seu negócio de fabricação de chips. </p>



<p>A empresa anunciou planos de mais de US$ 100 bilhões em investimento no último ano. O chefe executivo da Intel, Pat Gelsinger, disse que o novo projeto pode eventualmente crescer para acomodar oito fábricas de chips.</p>



<p>A Intel fará alguns de seus processadores de ponta nas novas fábricas, disse Gelsinger em entrevista. O planejamento para as duas primeiras fábricas começará imediatamente, com a construção prevista para começar no final de 2022, disse ele, e a produção deve entrar em operação em 2025. </p>



<h3>Plano da Intel reforça estratégia do governo dos EUA de fortalecer produção doméstica de chips</h3>



<p>A empresa também prometeu US$ 100 milhões para parcerias com instituições de ensino para desenvolver talentos e reforçar programas de pesquisa na região.</p>



<p>Gelsinger disse que a demanda por chips permanece alta e que as lacunas de oferta podem persistir até o próximo ano e potencialmente até 2024, embora mostrem alguns sinais de flexibilização nos próximos meses.</p>



<p>A Casa Branca informou que o plano de investimento da Intel contribuir com os esforços dos EUA para fortalecer a fabricação doméstica de chips. </p>



<p>Os governos, particularmente nos EUA e na Europa, tornaram-se preocupados em garantir seu fornecimento de semicondutores após anos em que a fabricação gravitou para países de menor custo na Ásia. A escassez de chips durante a pandemia só ampliou essas preocupações.</p>



<p>Espera-se que a instalação da Intel crie 3 mil empregos permanentes em Ohio, disse a empresa. Além disso, o projeto deve criar mais 7 mil empregos na construção e dezenas de milhares de empregos adicionais de apoio. </p>



<p></p>
]]></content:encoded>
                                                                                        </item>

                
                        <item>
                                <title>Especialista analisa o cenário de renda variável para janeiro</title>
                                <link>https://oespecialista.com.br/renda-variavel-janeiro-cenario-acoes-investir/</link>
                                <dc:creator>Redação</dc:creator>
                                <pubDate>Fri, 21 Jan 2022 16:19:38 +0000</pubDate>
                                <category><![CDATA[Investimentos]]></category>
                                <description><![CDATA[Estrategista detalha em live como a conjuntura econômica influencia as escolhas das ações para investir no primeiro mês de 2022. Veja]]></description>
                                <content:encoded><![CDATA[
<p>A <a href="https://oespecialista.com.br/chip-intel-4004-que-mudou-o-mundo/" target="_blank" rel="noreferrer noopener">Intel </a>anunciou que planeja investir pelo menos US$ 20 bilhões em novas instalações de fabricação de chips em Ohio. O anúncio, segundo o <a href="https://www.wsj.com/articles/intel-to-invest-at-least-20-billion-in-ohio-chip-making-facility-11642750760?mod=hp_lead_pos1" target="_blank" rel="noreferrer noopener">Wall Street Journal</a>, reforça a ambição de produção de semicondutores da empresa, diante da maior demanda por produtos digitais e escassez global diante de impacto logístico da pandemia de covid-19.</p>



<p>A Intel informou que planeja duas novas fábricas de chips nos arredores de Columbus, Ohio, para aumentar o esforço de expansão do seu negócio de fabricação de chips. </p>



<p>A empresa anunciou planos de mais de US$ 100 bilhões em investimento no último ano. O chefe executivo da Intel, Pat Gelsinger, disse que o novo projeto pode eventualmente crescer para acomodar oito fábricas de chips.</p>



<p>A Intel fará alguns de seus processadores de ponta nas novas fábricas, disse Gelsinger em entrevista. O planejamento para as duas primeiras fábricas começará imediatamente, com a construção prevista para começar no final de 2022, disse ele, e a produção deve entrar em operação em 2025. </p>



<h3>Plano da Intel reforça estratégia do governo dos EUA de fortalecer produção doméstica de chips</h3>



<p>A empresa também prometeu US$ 100 milhões para parcerias com instituições de ensino para desenvolver talentos e reforçar programas de pesquisa na região.</p>



<p>Gelsinger disse que a demanda por chips permanece alta e que as lacunas de oferta podem persistir até o próximo ano e potencialmente até 2024, embora mostrem alguns sinais de flexibilização nos próximos meses.</p>



<p>A Casa Branca informou que o plano de investimento da Intel contribuir com os esforços dos EUA para fortalecer a fabricação doméstica de chips. </p>



<p>Os governos, particularmente nos EUA e na Europa, tornaram-se preocupados em garantir seu fornecimento de semicondutores após anos em que a fabricação gravitou para países de menor custo na Ásia. A escassez de chips durante a pandemia só ampliou essas preocupações.</p>



<p>Espera-se que a instalação da Intel crie 3 mil empregos permanentes em Ohio, disse a empresa. Além disso, o projeto deve criar mais 7 mil empregos na construção e dezenas de milhares de empregos adicionais de apoio. </p>



<p></p>
]]></content:encoded>
                                                                                        </item>

                
                
                        <item>
                                <title>Financiamento de veículos cresce 6,8% em 2021</title>
                                <link>https://oespecialista.com.br/financiamento-veiculos-brasil-2021/</link>
                                <dc:creator>Redação</dc:creator>
                                <pubDate>Fri, 21 Jan 2022 16:19:38 +0000</pubDate>
                                <category><![CDATA[Economia]]></category>
                                <description><![CDATA[Vendas financiadas de motos e automóveis chegou a 5,9 milhões de unidades. Usados responderam por 70% dos financiamentos]]></description>
                                <content:encoded><![CDATA[
<p>A <a href="https://oespecialista.com.br/chip-intel-4004-que-mudou-o-mundo/" target="_blank" rel="noreferrer noopener">Intel </a>anunciou que planeja investir pelo menos US$ 20 bilhões em novas instalações de fabricação de chips em Ohio. O anúncio, segundo o <a href="https://www.wsj.com/articles/intel-to-invest-at-least-20-billion-in-ohio-chip-making-facility-11642750760?mod=hp_lead_pos1" target="_blank" rel="noreferrer noopener">Wall Street Journal</a>, reforça a ambição de produção de semicondutores da empresa, diante da maior demanda por produtos digitais e escassez global diante de impacto logístico da pandemia de covid-19.</p>



<p>A Intel informou que planeja duas novas fábricas de chips nos arredores de Columbus, Ohio, para aumentar o esforço de expansão do seu negócio de fabricação de chips. </p>



<p>A empresa anunciou planos de mais de US$ 100 bilhões em investimento no último ano. O chefe executivo da Intel, Pat Gelsinger, disse que o novo projeto pode eventualmente crescer para acomodar oito fábricas de chips.</p>



<p>A Intel fará alguns de seus processadores de ponta nas novas fábricas, disse Gelsinger em entrevista. O planejamento para as duas primeiras fábricas começará imediatamente, com a construção prevista para começar no final de 2022, disse ele, e a produção deve entrar em operação em 2025. </p>



<h3>Plano da Intel reforça estratégia do governo dos EUA de fortalecer produção doméstica de chips</h3>



<p>A empresa também prometeu US$ 100 milhões para parcerias com instituições de ensino para desenvolver talentos e reforçar programas de pesquisa na região.</p>



<p>Gelsinger disse que a demanda por chips permanece alta e que as lacunas de oferta podem persistir até o próximo ano e potencialmente até 2024, embora mostrem alguns sinais de flexibilização nos próximos meses.</p>



<p>A Casa Branca informou que o plano de investimento da Intel contribuir com os esforços dos EUA para fortalecer a fabricação doméstica de chips. </p>



<p>Os governos, particularmente nos EUA e na Europa, tornaram-se preocupados em garantir seu fornecimento de semicondutores após anos em que a fabricação gravitou para países de menor custo na Ásia. A escassez de chips durante a pandemia só ampliou essas preocupações.</p>



<p>Espera-se que a instalação da Intel crie 3 mil empregos permanentes em Ohio, disse a empresa. Além disso, o projeto deve criar mais 7 mil empregos na construção e dezenas de milhares de empregos adicionais de apoio. </p>



<p></p>
]]></content:encoded>
                                                                                        </item>

                
                        <item>
                                <title>Agronegócio tem exportação recorde anual de US$ 120 bilhões</title>
                                <link>https://oespecialista.com.br/agronegocio-recorde-exportacoes/</link>
                                <dc:creator>Redação</dc:creator>
                                <pubDate>Fri, 21 Jan 2022 16:19:38 +0000</pubDate>
                                <category><![CDATA[Economia]]></category>
                                <description><![CDATA[Aumento de 11,4% no volume exportado e de 22,5% nos preços ampliam presença do agronegócio na balança comercial brasileira]]></description>
                                <content:encoded><![CDATA[
<p>A <a href="https://oespecialista.com.br/chip-intel-4004-que-mudou-o-mundo/" target="_blank" rel="noreferrer noopener">Intel </a>anunciou que planeja investir pelo menos US$ 20 bilhões em novas instalações de fabricação de chips em Ohio. O anúncio, segundo o <a href="https://www.wsj.com/articles/intel-to-invest-at-least-20-billion-in-ohio-chip-making-facility-11642750760?mod=hp_lead_pos1" target="_blank" rel="noreferrer noopener">Wall Street Journal</a>, reforça a ambição de produção de semicondutores da empresa, diante da maior demanda por produtos digitais e escassez global diante de impacto logístico da pandemia de covid-19.</p>



<p>A Intel informou que planeja duas novas fábricas de chips nos arredores de Columbus, Ohio, para aumentar o esforço de expansão do seu negócio de fabricação de chips. </p>



<p>A empresa anunciou planos de mais de US$ 100 bilhões em investimento no último ano. O chefe executivo da Intel, Pat Gelsinger, disse que o novo projeto pode eventualmente crescer para acomodar oito fábricas de chips.</p>



<p>A Intel fará alguns de seus processadores de ponta nas novas fábricas, disse Gelsinger em entrevista. O planejamento para as duas primeiras fábricas começará imediatamente, com a construção prevista para começar no final de 2022, disse ele, e a produção deve entrar em operação em 2025. </p>



<h3>Plano da Intel reforça estratégia do governo dos EUA de fortalecer produção doméstica de chips</h3>



<p>A empresa também prometeu US$ 100 milhões para parcerias com instituições de ensino para desenvolver talentos e reforçar programas de pesquisa na região.</p>



<p>Gelsinger disse que a demanda por chips permanece alta e que as lacunas de oferta podem persistir até o próximo ano e potencialmente até 2024, embora mostrem alguns sinais de flexibilização nos próximos meses.</p>



<p>A Casa Branca informou que o plano de investimento da Intel contribuir com os esforços dos EUA para fortalecer a fabricação doméstica de chips. </p>



<p>Os governos, particularmente nos EUA e na Europa, tornaram-se preocupados em garantir seu fornecimento de semicondutores após anos em que a fabricação gravitou para países de menor custo na Ásia. A escassez de chips durante a pandemia só ampliou essas preocupações.</p>



<p>Espera-se que a instalação da Intel crie 3 mil empregos permanentes em Ohio, disse a empresa. Além disso, o projeto deve criar mais 7 mil empregos na construção e dezenas de milhares de empregos adicionais de apoio. </p>



<p></p>
]]></content:encoded>
                                                                                        </item>

                
                        <item>
                                <title>Multiplan bate recorde de vendas e tem perspectiva de valorização</title>
                                <link>https://oespecialista.com.br/multiplan-recorde-vendas/</link>
                                <dc:creator>Redação</dc:creator>
                                <pubDate>Fri, 21 Jan 2022 16:19:38 +0000</pubDate>
                                <category><![CDATA[Item com 3 categorias cadastradas]]></category>
                                <category><![CDATA[Investimetnos]]></category>
                                <category><![CDATA[Negócios]]></category>
                                <description><![CDATA[Somente na semana do Natal, as vendas chegaram perto de R$ 1 bilhão, um aumento de 16,7% em relação a 2019]]></description>
                                <content:encoded><![CDATA[
<p>A <a href="https://oespecialista.com.br/chip-intel-4004-que-mudou-o-mundo/" target="_blank" rel="noreferrer noopener">Intel </a>anunciou que planeja investir pelo menos US$ 20 bilhões em novas instalações de fabricação de chips em Ohio. O anúncio, segundo o <a href="https://www.wsj.com/articles/intel-to-invest-at-least-20-billion-in-ohio-chip-making-facility-11642750760?mod=hp_lead_pos1" target="_blank" rel="noreferrer noopener">Wall Street Journal</a>, reforça a ambição de produção de semicondutores da empresa, diante da maior demanda por produtos digitais e escassez global diante de impacto logístico da pandemia de covid-19.</p>



<p>A Intel informou que planeja duas novas fábricas de chips nos arredores de Columbus, Ohio, para aumentar o esforço de expansão do seu negócio de fabricação de chips. </p>



<p>A empresa anunciou planos de mais de US$ 100 bilhões em investimento no último ano. O chefe executivo da Intel, Pat Gelsinger, disse que o novo projeto pode eventualmente crescer para acomodar oito fábricas de chips.</p>



<p>A Intel fará alguns de seus processadores de ponta nas novas fábricas, disse Gelsinger em entrevista. O planejamento para as duas primeiras fábricas começará imediatamente, com a construção prevista para começar no final de 2022, disse ele, e a produção deve entrar em operação em 2025. </p>



<h3>Plano da Intel reforça estratégia do governo dos EUA de fortalecer produção doméstica de chips</h3>



<p>A empresa também prometeu US$ 100 milhões para parcerias com instituições de ensino para desenvolver talentos e reforçar programas de pesquisa na região.</p>



<p>Gelsinger disse que a demanda por chips permanece alta e que as lacunas de oferta podem persistir até o próximo ano e potencialmente até 2024, embora mostrem alguns sinais de flexibilização nos próximos meses.</p>



<p>A Casa Branca informou que o plano de investimento da Intel contribuir com os esforços dos EUA para fortalecer a fabricação doméstica de chips. </p>



<p>Os governos, particularmente nos EUA e na Europa, tornaram-se preocupados em garantir seu fornecimento de semicondutores após anos em que a fabricação gravitou para países de menor custo na Ásia. A escassez de chips durante a pandemia só ampliou essas preocupações.</p>



<p>Espera-se que a instalação da Intel crie 3 mil empregos permanentes em Ohio, disse a empresa. Além disso, o projeto deve criar mais 7 mil empregos na construção e dezenas de milhares de empregos adicionais de apoio. </p>



<p></p>
]]></content:encoded>
                                                                                        </item>

                
                        <item>
                                <title>Suzano aumentará preço da celulose na Ásia em US$ 50 por tonelada</title>
                                <link>https://oespecialista.com.br/suzano-preco-celulose-asia/</link>
                                <dc:creator>Redação</dc:creator>
                                <pubDate>Fri, 21 Jan 2022 16:19:38 +0000</pubDate>
                                <category><![CDATA[Negócios]]></category>
                                <description><![CDATA[Reajuste vem com a retomada da demanda na China, que se iniciou no final de 2021. Plano é aproximar valor do praticado na Europa]]></description>
                                <content:encoded><![CDATA[
<p>A <a href="https://oespecialista.com.br/chip-intel-4004-que-mudou-o-mundo/" target="_blank" rel="noreferrer noopener">Intel </a>anunciou que planeja investir pelo menos US$ 20 bilhões em novas instalações de fabricação de chips em Ohio. O anúncio, segundo o <a href="https://www.wsj.com/articles/intel-to-invest-at-least-20-billion-in-ohio-chip-making-facility-11642750760?mod=hp_lead_pos1" target="_blank" rel="noreferrer noopener">Wall Street Journal</a>, reforça a ambição de produção de semicondutores da empresa, diante da maior demanda por produtos digitais e escassez global diante de impacto logístico da pandemia de covid-19.</p>



<p>A Intel informou que planeja duas novas fábricas de chips nos arredores de Columbus, Ohio, para aumentar o esforço de expansão do seu negócio de fabricação de chips. </p>



<p>A empresa anunciou planos de mais de US$ 100 bilhões em investimento no último ano. O chefe executivo da Intel, Pat Gelsinger, disse que o novo projeto pode eventualmente crescer para acomodar oito fábricas de chips.</p>



<p>A Intel fará alguns de seus processadores de ponta nas novas fábricas, disse Gelsinger em entrevista. O planejamento para as duas primeiras fábricas começará imediatamente, com a construção prevista para começar no final de 2022, disse ele, e a produção deve entrar em operação em 2025. </p>



<h3>Plano da Intel reforça estratégia do governo dos EUA de fortalecer produção doméstica de chips</h3>



<p>A empresa também prometeu US$ 100 milhões para parcerias com instituições de ensino para desenvolver talentos e reforçar programas de pesquisa na região.</p>



<p>Gelsinger disse que a demanda por chips permanece alta e que as lacunas de oferta podem persistir até o próximo ano e potencialmente até 2024, embora mostrem alguns sinais de flexibilização nos próximos meses.</p>



<p>A Casa Branca informou que o plano de investimento da Intel contribuir com os esforços dos EUA para fortalecer a fabricação doméstica de chips. </p>



<p>Os governos, particularmente nos EUA e na Europa, tornaram-se preocupados em garantir seu fornecimento de semicondutores após anos em que a fabricação gravitou para países de menor custo na Ásia. A escassez de chips durante a pandemia só ampliou essas preocupações.</p>



<p>Espera-se que a instalação da Intel crie 3 mil empregos permanentes em Ohio, disse a empresa. Além disso, o projeto deve criar mais 7 mil empregos na construção e dezenas de milhares de empregos adicionais de apoio. </p>



<p></p>
]]></content:encoded>
                                                                                        </item>

                        
</channel>
</rss>`;

  let xmlnovo_FAKE = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"
xmlns:content="http://purl.org/rss/1.0/modules/content/"
xmlns:wfw="http://wellformedweb.org/CommentAPI/"
xmlns:dc="http://purl.org/dc/elements/1.1/"
xmlns:atom="http://www.w3.org/2005/Atom"
xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
>

<channel>
<title>O Especialista</title>
<atom:link href="https://oespecialista.com.br/feed/" rel="self" type="application/rss+xml" />
<link>https://oespecialista.com.br</link>
<description>O Especialista</description>
<lastBuildDate>Fri, 21 Jan 2022 13:24:12 +0000</lastBuildDate>
<language>pt-BR</language>
<sy:updatePeriod>
hourly	</sy:updatePeriod>
<sy:updateFrequency>
1	</sy:updateFrequency>
<generator>https://wordpress.org/?v=5.8.1</generator>

<image>
<url>https://oespecialista.com.br/wp-content/uploads/2020/12/cropped-android-icon-192x192-2-1-32x32.png</url>
<title>O Especialista</title>
<link>https://oespecialista.com.br</link>
<width>32</width>
<height>32</height>
</image> 
<item>
  <title>Consumidores que pouparam energia terão desconto de R$ 2,4 bilhões</title>
  <link>https://oespecialista.com.br/consumidores-que-pouparam-energia-terao-desconto/</link>
  
  <dc:creator><![CDATA[Redação]]></dc:creator>
  <pubDate>Fri, 21 Jan 2022 13:24:11 +0000</pubDate>
      <category><![CDATA[Economia]]></category>
  <category><![CDATA[Consumo consciente]]></category>
  <category><![CDATA[Conta de luz]]></category>
  <category><![CDATA[Energia]]></category>
  <category><![CDATA[Hidrelétricas]]></category>
  <category><![CDATA[Ministério das Minas e Energia]]></category>
  <guid isPermaLink="false">https://oespecialista.com.br/?p=148355</guid>

        <description><![CDATA[<p>Conta de luz de janeiro deverá trazer descontos referentes ao esforço voluntário de economia de energia durante a crise hídrica</p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/consumidores-que-pouparam-energia-terao-desconto/">Consumidores que pouparam energia terão desconto de R$ 2,4 bilhões</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></description>
                  <content:encoded><![CDATA[<p>Os descontos na conta de luz para consumidores residenciais que pouparam energia de forma voluntária em 2021 vão somar, no total, R$ 2,4 bilhões.</p>
<p>O &#8220;bônus&#8221; deve ser pago na fatura referente ao mês de janeiro, de acordo com nota divulgada pelo Ministério de Minas e Energia (MME) nesta quinta-feira, 20. O programa foi uma das medidas adotadas pelo governo em meio à crise hídrica para evitar problemas no fornecimento de energia.</p>
<p>Lançada em agosto, a iniciativa tinha objetivo de incentivar que consumidores atendidos pelas distribuidoras economizassem energia, sem que o governo precisasse impor um racionamento, como aconteceu em 2001.</p>
<p>Terá direito ao desconto aqueles que reduziram, pelo menos, 10% do consumo de energia de setembro a dezembro de 2021, na comparação com a soma das mesmas quatro faturas de 2020.</p>
<p>Segundo os dados do governo, o programa gerou uma economia de 5,6 milhões de megawatt-hora (MWh) no período, o que representa cerca de 4,5% a menos na tarifa do consumidor residencial.</p>
<p>A quantidade corresponde, por exemplo, ao consumo anual do Estado da Paraíba ou do Rio Grande do Norte e é suficiente para abastecer 32,8 milhões de famílias por mês.</p>
<p>&#8220;O valor também corresponde a 3,81% da capacidade máxima de armazenamento no subsistema Sudeste/Centro-Oeste, considerado a &#8216;caixa d&#8217;água&#8217; do Brasil. Comparativamente, a energia equivale à geração das usinas termoelétricas de Angra I e II durante cerca de quatro meses do ano&#8221;, informou o MME.</p>
<h3>Economia de energia ajudou a poupar os reservatórios das hidrelétricas</h3>
<p>Assim como outras medidas adotadas ao longo do ano passado, como acionamento de térmicas e importação de energia, o bônus será pago pelos próprios consumidores. Para fazer frente a essas despesas, o governo autorizou um socorro financeiro ao setor elétrico. O empréstimo está previsto em Medida Provisória (MP) publicada em dezembro e regulamentada por decreto presidencial.</p>
<p>Embora os trâmites para liberação dos recursos estejam encaminhados, os valores e prazos para pagamento serão definidos pela Agência Nacional de Energia Elétrica (Aneel). Os cálculos analisados mais recentes indicam que a melhora nos reservatórios pode fazer com que o financiamento caia para R$ 4,5 bilhões. O empréstimo será pago nos próximos anos, com a incidência de juros.</p>
<p>O Ministério das Minas e Energia informou ainda que a medida trouxe &#8220;benefícios econômicos indiretos&#8221;. Ao longo do ano passado, o governo autorizou o uso até mesmo das térmicas mais caras e a importação de energia da Argentina e do Uruguai para garantir o abastecimento.</p>
<p>&#8220;Em termos de benefícios econômicos indiretos, considerando que o custo da usina mais cara despachada no período de outubro a dezembro foi de R$ 2.533,20/MWh (UTE Araucária) e que o custo do programa foi de R$ 500/MWh, pode-se estimar que os consumidores economizaram quatro vezes mais, ou seja, R$ 9,6 bilhões, caso se substituísse o programa por geração termelétrica adicional ao custo da UTE Araucária&#8221;, diz a nota. (AE)</p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/consumidores-que-pouparam-energia-terao-desconto/">Consumidores que pouparam energia terão desconto de R$ 2,4 bilhões</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></content:encoded>
        
  
  
    </item>
  <item>
  <title>Eletrobras marca para 22 de fevereiro assembleia para definir venda da empresa</title>
  <link>https://oespecialista.com.br/eletrobras-assembleia-venda-privatizacao/</link>
  
  <dc:creator><![CDATA[Redação]]></dc:creator>
  <pubDate>Fri, 21 Jan 2022 13:05:37 +0000</pubDate>
      <category><![CDATA[Investimentos]]></category>
  <category><![CDATA[Negócios]]></category>
  <category><![CDATA[Ações Eletrobras]]></category>
  <category><![CDATA[Bolsa de valores]]></category>
  <category><![CDATA[Eletrobras]]></category>
  <category><![CDATA[Oferta pública]]></category>
  <guid isPermaLink="false">https://oespecialista.com.br/?p=148307</guid>

        <description><![CDATA[<p>Reunião vai separar os ativos que vão ficar de fora da capitalização prevista para acontecer no segundo trimestre deste ano</p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/eletrobras-assembleia-venda-privatizacao/">Eletrobras marca para 22 de fevereiro assembleia para definir venda da empresa</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></description>
                  <content:encoded><![CDATA[
<p>A Eletrobras (<a href="https://www.safra.com.br/central-de-conteudo/analisar/analise-de-acoes-eletrobras-elet3.htm" target="_blank" rel="noreferrer noopener">ELET6</a>) marcou para 22 de fevereiro a Assembleia Geral Extraordinária (AGE) que vai viabilizar a desestatização da empresa.</p>



<p>No encontro, será definida a separação dos ativos que não serão objeto da capitalização prevista para ocorrer no segundo trimestre deste ano.</p>



<h3>Mais sobre Eletrobras</h3>



<ul><li><a href="https://oespecialista.com.br/eletrobras-oferta-publica-acoes/" target="_blank" rel="noreferrer noopener">Eletrobras deve ofertar ações no Brasil e nos EUA no 2º trimestre</a></li><li><a href="https://oespecialista.com.br/banco-do-brasil-eletrobras-petrobras-processos-justica/" target="_blank" rel="noreferrer noopener">BB, Eletrobras e Petrobras enfrentam processos judiciais de R$ 350 bi</a></li><li><a href="https://oespecialista.com.br/b3-carteiras-indices-esg-sustentabilidade/" target="_blank" rel="noreferrer noopener">B3 divulga carteiras de índices com base em critérios ESG</a></li></ul>



<p></p>



<p>A companhia observou que a operação na B3 (<a href="https://www.safra.com.br/central-de-conteudo/analisar/analise-de-acoes-b3-b3sa3.htm" target="_blank" rel="noreferrer noopener">B3SA3</a>), porém, ainda depende da <a href="https://oespecialista.com.br/tcu-privatizacao-eletrobras/" target="_blank" rel="noreferrer noopener">aprovação do Tribunal de Contas da União (TCU)</a>.</p>



<p>Na AGE será votada a reestruturação societária da Eletrobras, para manter sob o controle da União, via Empresa Brasileira de Participações em Energia Nuclear e Binacional (ENBpar), direto ou indireto, a Eletronuclear e a usina hidrelétrica binacional de Itaipu.</p>



<p>Também passará pela avaliação dos acionistas o preço estipulado para Itaipu, de R$ 1,2 bilhão, e as condições para que a ENBPar assuma a Eletronuclear e outros programas do governo que não vão ser privatizados.</p>



<p>Entre os que estão fora da lista de vendas se encontram o programa de revitalização do rio São Francisco, o Centro de Pesquisa de Energia Elétrica (Cepel) e o programa de redução de custos da energia elétrica na Amazônia Legal. (AE)</p>


<div id="abra_sua_conta" class="mt-2 mb-4">
  <form class="lead-contact p-md-5 p-3" action="https://oespecialista.com.br/wp-json/safra/v1/lead" type="POST" id="s-report">
      <h3 class="title-abra-sua-conta mb-4">Abra sua conta</h3>

      <!-- <input type="hidden" name="_ri_" value="X0Gzc2X%3DAQpglLjHJlDQGhzgFzcHWLRBzbTgrjAbOaWT3pn72MSk3qzf3ib7mfVwjpnpgHlpgneHmgJoXX0Gzc2X%3DAQpglLjHJlDQGNPisAzbzeI9AzatEKjhj8jKpTn72MSk3qzf3ib7mf"> -->
      <!-- <input type="hidden" name="_ei_" value="EvfdV6Yh62kr8ZoeMqkjIwc"> -->
      <!-- <input type="hidden" name="_di_" value="ut85orsrgpa7tuakto09rmcsv4mn073rpuupl0iu39magtkotfg0"> -->
      <input type="hidden" name="ORIGEM" value="especialita-cartoes">
      <input type="hidden" name="MOBILE_COUNTRY_" value="BR">

      <div class="form-group">
                      <input type="text" class="form-control" name="NOME" placeholder="Nome" id="nome" required data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"preencheu","eventLabel":"nome"},"settings":{"eventType":"blur","validValue":true}}' />
      </div>

      <div class="form-group">
                      <input type="text"class="form-control"  name="EMAIL_ADDRESS_" placeholder="E-mail" required data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"preencheu","eventLabel":"email"},"settings":{"eventType":"blur","validValue":true}}' />
      </div>

      <!-- <div class="form-group">
          <?//php $auxDataGA = formatEventJSON([
              //'set' => [
                //  'contentGroup1' => 'esp:hub:abra-sua-conta',
             // ],
            //  'event' => [
            //      'eventCategory' => 'esp:hub:abra-sua-conta',
          //        'eventAction' => 'preencheu',
          //        'eventLabel' => 'telefone',
           //   ],
           //   'settings' => [
           //       'eventType' => 'blur',
           //       'validValue' => true
           //   ]
         // ]); ?>
          <input type="text"class="form-control"  id="telefone" name="MOBILE_NUMBER_" placeholder="Telefone" data-mask-selectonfocus="true" required data-ga='<?//= $auxDataGA ?>' />
      </div> -->

      <!-- <div class="form-group">
          <?//php $auxDataGA = formatEventJSON([
            //  'set' => [
            //      'contentGroup1' => 'esp:hub:abra-sua-conta',
             // ],
             // 'event' => [
              //    'eventCategory' => 'esp:hub:abra-sua-conta',
                //  'eventAction' => 'preencheu',
                  // 'eventLabel' => 'cpf',
              //],
               //'settings' => [
                 // 'eventType' => 'blur',
                 // 'validValue' => true
             // ]
           //]); ?>
          <input type="text"class="form-control"  name="CUSTOMER_ID_" placeholder="CPF" required data-ga='<?//= $auxDataGA ?>' />
      </div> -->

      <div class="form-group">
          
          <select class="form-control" name="RENDA" id="renda" form="s-report" required data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"preencheu","eventLabel":"renda"},"settings":{"eventType":"blur","validValue":true}}'>
              <option value="" >Renda Declarada </option>
              <option value="até R$ 2 mil">até R$ 2 mil</option>
              <option value="de R$ 2 mil a R$ 5 mil">de R$ 2 mil a R$ 5 mil</option>
              <option value="de R$ 5 mil a R$ 8 mil">de R$ 5 mil a R$ 8 mil</option>
              <option value="de R$ 8 mil a R$ 12 mil">de R$ 8 mil a R$ 12 mil</option>
              <option value="de R$ 12 mil a R$ 25 mil">de R$ 12 mil a R$ 25 mil</option>
              <option value="acima de R$ 25 mil">acima de R$ 25 mil</option>
              <!-- <option value="2000">até R$ 2 mil</option>
              <option value="20005000">de R$ 2 mil a R$ 5 mil</option>
              <option value="50008000">de R$ 5 mil a R$ 8 mil</option>
              <option value="800012000">de R$ 8 mil a R$ 12 mil</option>
              <option value="1200025000">de R$ 12 mil a R$ 25 mil</option>
              <option value="25000">acima de R$ 25 mil</option> -->
          </select>

      </div>

              <button class="btn btn-primary" type="submit" data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"clicou","eventLabel":"botao:cadastrar","eventValue":"1"}}'>Cadastrar</button>

      <input type="checkbox" class="form-check-input ml-0 mr-2 position-relative" checked required />

      <label>
          Ao preencher e enviar este formulário, você autoriza que o Safra entre em contato com você por celular, e-mail ou WhatsApp.
          Li e concordo com os <a style="color:#fff; text-decoration:underline;" href="https://www.safra.com.br/sobre/portal-da-privacidade-e-lgpd.htm?componente=#Politicas" target="_blank" >termos de uso e política de privacidade.</a>
      </label>

      <!-- Redirect fields -->
      <input type="hidden" name="até R$ 2 mil" value="https://oespecialista.com.br/oportunidade-ag-zero/" />
      <input type="hidden" name="de R$ 2 mil a R$ 5 mil" value="https://oespecialista.com.br/oportunidade-ag-zero/" />
      <input type="hidden" name="de R$ 5 mil a R$ 8 mil" value="https://oespecialista.com.br/oportunidade-ag-zero/" />
      <input type="hidden" name="de R$ 8 mil a R$ 12 mil" value="https://oespecialista.com.br/confirmacao-abra-sua-conta/" />
      <input type="hidden" name="de R$ 12 mil a R$ 25 mil" value="https://oespecialista.com.br/confirmacao-abra-sua-conta/" />
      <input type="hidden" name="acima de R$ 25 mil" value="https://oespecialista.com.br/confirmacao-abra-sua-conta/" />
  </form>
</div>
<!-- /#newsletter -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.10/jquery.mask.js"></script>
<script>
  $(document).ready(function(){
      $('#telefone').mask('+55 (00) 000000000');
      $('#telefone2').mask('+55 (00) 000000000');
  });

  jQuery('#nome').keyup(function() {
      let val = jQuery(this).val()
      val = val.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      jQuery(this).val(val)
  })

  //var semAcento = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
</script>



<p></p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/eletrobras-assembleia-venda-privatizacao/">Eletrobras marca para 22 de fevereiro assembleia para definir venda da empresa</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></content:encoded>
        
  
  
    </item>
  <item>
  <title>Ações da NotreDame deixarão de ser negociadas em 11 de fevereiro</title>
  <link>https://oespecialista.com.br/acoes-notredame-intermedica-gndi3-hapvida-hapv3/</link>
  
  <dc:creator><![CDATA[Redação]]></dc:creator>
  <pubDate>Fri, 21 Jan 2022 12:46:41 +0000</pubDate>
      <category><![CDATA[Investimentos]]></category>
  <category><![CDATA[Negócios]]></category>
  <category><![CDATA[Ações]]></category>
  <category><![CDATA[Aquisição]]></category>
  <category><![CDATA[Fusão]]></category>
  <category><![CDATA[Hapvida]]></category>
  <category><![CDATA[Notre Dame]]></category>
  <guid isPermaLink="false">https://oespecialista.com.br/?p=148354</guid>

        <description><![CDATA[<p>Em processo de fusão com o Hapvida, empresas detalharam à CVM os próximos passos e efeitos do negócio para os investidores</p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/acoes-notredame-intermedica-gndi3-hapvida-hapv3/">Ações da NotreDame deixarão de ser negociadas em 11 de fevereiro</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></description>
                  <content:encoded><![CDATA[
<p>O Sistema Hapvida (<a href="https://www.safra.com.br/central-de-conteudo/analisar/acoes/analise-de-acoes-hapvida-hapv3.htm" target="_blank" rel="noreferrer noopener">HAPV3</a>) e o Grupo NotreDame Intermédica (<a href="https://www.safra.com.br/central-de-conteudo/analisar/analise-de-acoes/analise-de-acoes-intermedica-gndi3.htm" target="_blank" rel="noreferrer noopener">GNDI3</a>) informaram à Comissão de Valores Mobiliários (CVM) que as ações da NotreDame vão deixar de ser negociadas na B3, a bolsa de valores brasileira, a partir de 11 de fevereiro.</p>



<p>Conforme comunicado, após alguns passos que serão dados nas próximas semanas, haverá o início da negociação das Novas Ações Hapvida na B3 em 14 de fevereiro.</p>



<h3>Saiba mais</h3>



<ul><li><a href="https://oespecialista.com.br/b3-carteiras-indices-esg-sustentabilidade/" target="_blank" rel="noreferrer noopener">B3 divulga carteiras de índices com base em critérios ESG</a></li><li><a href="https://oespecialista.com.br/operacoes-sugeridas-investir-renda-variavel/" target="_blank" rel="noreferrer noopener">Boas opções para investir em renda variável ainda em janeiro</a></li><li><a href="https://t.me/safraconteudo" target="_blank" rel="noreferrer noopener">Receba diretamente as análises do Banco Safra pelo Telegram</a></li></ul>



<p></p>



<p>Dois dias depois, 16/02, será efetivado o crédito das novas ações Hapvida nas contas de custódia dos acionistas da NotreDame. </p>



<p>Em seguida, no dia 29 de março, ocorrerá o pagamento pela NotreDame aos seus acionistas do valor correspondente aos dividendos extraordinários declarados pela companhia. </p>



<p>No mesmo dia, será realizado o pagamento pela HapvidaCo (ou sua sucessora) aos acionistas da NotreDame Intermédica do valor final correspondente à Parcela Caixa.</p>


<div id="abra_sua_conta" class="mt-2 mb-4">
  <form class="lead-contact p-md-5 p-3" action="https://oespecialista.com.br/wp-json/safra/v1/lead" type="POST" id="s-report">
      <h3 class="title-abra-sua-conta mb-4">Abra sua conta</h3>

      <!-- <input type="hidden" name="_ri_" value="X0Gzc2X%3DAQpglLjHJlDQGhzgFzcHWLRBzbTgrjAbOaWT3pn72MSk3qzf3ib7mfVwjpnpgHlpgneHmgJoXX0Gzc2X%3DAQpglLjHJlDQGNPisAzbzeI9AzatEKjhj8jKpTn72MSk3qzf3ib7mf"> -->
      <!-- <input type="hidden" name="_ei_" value="EvfdV6Yh62kr8ZoeMqkjIwc"> -->
      <!-- <input type="hidden" name="_di_" value="ut85orsrgpa7tuakto09rmcsv4mn073rpuupl0iu39magtkotfg0"> -->
      <input type="hidden" name="ORIGEM" value="especialita-cartoes">
      <input type="hidden" name="MOBILE_COUNTRY_" value="BR">

      <div class="form-group">
                      <input type="text" class="form-control" name="NOME" placeholder="Nome" id="nome" required data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"preencheu","eventLabel":"nome"},"settings":{"eventType":"blur","validValue":true}}' />
      </div>

      <div class="form-group">
                      <input type="text"class="form-control"  name="EMAIL_ADDRESS_" placeholder="E-mail" required data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"preencheu","eventLabel":"email"},"settings":{"eventType":"blur","validValue":true}}' />
      </div>

      <!-- <div class="form-group">
          <?//php $auxDataGA = formatEventJSON([
              //'set' => [
                //  'contentGroup1' => 'esp:hub:abra-sua-conta',
             // ],
            //  'event' => [
            //      'eventCategory' => 'esp:hub:abra-sua-conta',
          //        'eventAction' => 'preencheu',
          //        'eventLabel' => 'telefone',
           //   ],
           //   'settings' => [
           //       'eventType' => 'blur',
           //       'validValue' => true
           //   ]
         // ]); ?>
          <input type="text"class="form-control"  id="telefone" name="MOBILE_NUMBER_" placeholder="Telefone" data-mask-selectonfocus="true" required data-ga='<?//= $auxDataGA ?>' />
      </div> -->

      <!-- <div class="form-group">
          <?//php $auxDataGA = formatEventJSON([
            //  'set' => [
            //      'contentGroup1' => 'esp:hub:abra-sua-conta',
             // ],
             // 'event' => [
              //    'eventCategory' => 'esp:hub:abra-sua-conta',
                //  'eventAction' => 'preencheu',
                  // 'eventLabel' => 'cpf',
              //],
               //'settings' => [
                 // 'eventType' => 'blur',
                 // 'validValue' => true
             // ]
           //]); ?>
          <input type="text"class="form-control"  name="CUSTOMER_ID_" placeholder="CPF" required data-ga='<?//= $auxDataGA ?>' />
      </div> -->

      <div class="form-group">
          
          <select class="form-control" name="RENDA" id="renda" form="s-report" required data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"preencheu","eventLabel":"renda"},"settings":{"eventType":"blur","validValue":true}}'>
              <option value="" >Renda Declarada </option>
              <option value="até R$ 2 mil">até R$ 2 mil</option>
              <option value="de R$ 2 mil a R$ 5 mil">de R$ 2 mil a R$ 5 mil</option>
              <option value="de R$ 5 mil a R$ 8 mil">de R$ 5 mil a R$ 8 mil</option>
              <option value="de R$ 8 mil a R$ 12 mil">de R$ 8 mil a R$ 12 mil</option>
              <option value="de R$ 12 mil a R$ 25 mil">de R$ 12 mil a R$ 25 mil</option>
              <option value="acima de R$ 25 mil">acima de R$ 25 mil</option>
              <!-- <option value="2000">até R$ 2 mil</option>
              <option value="20005000">de R$ 2 mil a R$ 5 mil</option>
              <option value="50008000">de R$ 5 mil a R$ 8 mil</option>
              <option value="800012000">de R$ 8 mil a R$ 12 mil</option>
              <option value="1200025000">de R$ 12 mil a R$ 25 mil</option>
              <option value="25000">acima de R$ 25 mil</option> -->
          </select>

      </div>

              <button class="btn btn-primary" type="submit" data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"clicou","eventLabel":"botao:cadastrar","eventValue":"1"}}'>Cadastrar</button>

      <input type="checkbox" class="form-check-input ml-0 mr-2 position-relative" checked required />

      <label>
          Ao preencher e enviar este formulário, você autoriza que o Safra entre em contato com você por celular, e-mail ou WhatsApp.
          Li e concordo com os <a style="color:#fff; text-decoration:underline;" href="https://www.safra.com.br/sobre/portal-da-privacidade-e-lgpd.htm?componente=#Politicas" target="_blank" >termos de uso e política de privacidade.</a>
      </label>

      <!-- Redirect fields -->
      <input type="hidden" name="até R$ 2 mil" value="https://oespecialista.com.br/oportunidade-ag-zero/" />
      <input type="hidden" name="de R$ 2 mil a R$ 5 mil" value="https://oespecialista.com.br/oportunidade-ag-zero/" />
      <input type="hidden" name="de R$ 5 mil a R$ 8 mil" value="https://oespecialista.com.br/oportunidade-ag-zero/" />
      <input type="hidden" name="de R$ 8 mil a R$ 12 mil" value="https://oespecialista.com.br/confirmacao-abra-sua-conta/" />
      <input type="hidden" name="de R$ 12 mil a R$ 25 mil" value="https://oespecialista.com.br/confirmacao-abra-sua-conta/" />
      <input type="hidden" name="acima de R$ 25 mil" value="https://oespecialista.com.br/confirmacao-abra-sua-conta/" />
  </form>
</div>
<!-- /#newsletter -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.10/jquery.mask.js"></script>
<script>
  $(document).ready(function(){
      $('#telefone').mask('+55 (00) 000000000');
      $('#telefone2').mask('+55 (00) 000000000');
  });

  jQuery('#nome').keyup(function() {
      let val = jQuery(this).val()
      val = val.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      jQuery(this).val(val)
  })

  //var semAcento = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
</script>



<p></p>



<h3>Detalhes da operação com as ações da NotreDame e do Hapvida</h3>



<p>Ambas as empresas detalharam os passos finais da fusão à CVM em complemento ao Fato Relevante divulgado em 4 de janeiro de 2022.</p>



<p>No documento, elas comunicaram ao órgão a <a href="https://oespecialista.com.br/parecer-cade-fusao-hapvida-intermedica/" target="_blank" rel="noreferrer noopener">decisão da Superintendência-Geral do Cade (Conselho Administrativo de Defesa Econômica) que aprovou a combinação de negócios</a> entre as companhias sem restrições.</p>



<p>A primeira fase compreende a incorporação da totalidade das ações da NotreDame Intermédica pela HapvidaCo com a emissão, aos acionistas da primeira companhia, de 1 ação ordinária e 1 ação preferencial resgatável de emissão da HapvidaCo para cada ação da NotreDame incorporada.</p>



<p>A segunda etapa diz respeito ao resgate de ações preferenciais da HapvidaCo, com o pagamento, para cada 1 ação preferencial resgatável, de R$ 5,12601160179 (Parcela Caixa). </p>



<p>A parcela já considera o desconto dos Dividendos Extraordinários declarados pela NotreDame no valor total de R$ 1 bilhão (correspondente ao valor bruto de R$ 1,613026961 por ação), bem como a atualização pela variação do CDI (<a href="https://oespecialista.com.br/cdi-certificado-deposito-interbancario/" target="_blank" rel="noreferrer noopener">Certificado de Depósito Interbancário</a>) sobre o valor total de R$ 4 bilhões a partir de 29 de março de 2021 até a presente data.</p>



<p>Por fim, ocorrerá a efetiva incorporação da HapvidaCo pela Hapvida, com a consequente extinção da HapvidaCo e sucessão, pela Hapvida, de todos os seus bens, direitos e obrigações. </p>



<p>Também acontecerá a migração dos acionistas da NotreDame para a Hapvida por meio do recebimento de novas ações ordinárias da companhia, emitidas com base na Relação de Troca. </p>



<p>Esta prevê que, para cada ação ordinária de emissão da NotreDame, os acionistas da companhia receberão 5,2436 ações ordinárias da Hapvida. (Com AE)</p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/acoes-notredame-intermedica-gndi3-hapvida-hapv3/">Ações da NotreDame deixarão de ser negociadas em 11 de fevereiro</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></content:encoded>
        
  
  
    </item>
  <item>
  <title>Mercado Livre compra participação no Mercado Bitcoin e Paxos</title>
  <link>https://oespecialista.com.br/mercado-livre-compra-mercado-bitcoin-e-paxos/</link>
  
  <dc:creator><![CDATA[Redação]]></dc:creator>
  <pubDate>Fri, 21 Jan 2022 12:02:55 +0000</pubDate>
      <category><![CDATA[Investimentos]]></category>
  <category><![CDATA[Negócios]]></category>
  <category><![CDATA[Bitcoin]]></category>
  <category><![CDATA[Blockchain]]></category>
  <category><![CDATA[Criptoativos]]></category>
  <category><![CDATA[Criptomoedas]]></category>
  <category><![CDATA[Mercado Livre]]></category>
  <guid isPermaLink="false">https://oespecialista.com.br/?p=148336</guid>

        <description><![CDATA[<p>Compra da participação no Grupo 2TM, dona do Mercado Bitcoin e da Paxos, não foi revelado pelo Mercado Livre</p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/mercado-livre-compra-mercado-bitcoin-e-paxos/">Mercado Livre compra participação no Mercado Bitcoin e Paxos</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></description>
                  <content:encoded><![CDATA[<p>O Mercado Livre comprou uma participação no Grupo 2TM, que controla o Mercado Bitcoin, e também na Paxos, plataforma de infraestrutura de blockchain. O valor do investimento no setor de criptoativos não foi informado.</p>
<p>Em comunicado, a empresa de comércio eletrônico, que também detém a fintech Mercado Pago, afirma que os aportes reforçam o compromisso com o desenvolvimento e o uso de ativos digitais e tecnologia blockchain, bem como oferecer mais produtos e serviços para empreendedores e consumidores latino-americanos.</p>
<h3>Saiba mais</h3>
<p> </p>
<ul>
<li><a href="https://oespecialista.com.br/como-investir-em-criptoativos-na-safra-corretora/" target="_blank" rel="noopener">Analista explica como investir em criptoativos</a></li>
<li><a href="https://oespecialista.com.br/criptoativos-o-que-sao-como-funcionam-como-investir/">Criptoativos: como funcionam e como começar a investir</a></li>
<li><a href="https://www.safra.com.br/sobre/corretora.htm" target="_blank" rel="noreferrer noopener">Conheça os serviços da Safra Corretora</a></li>
</ul>
<p>A Paxos já é parceira do Mercado Livre. Desde dezembro, o Mercado Pago oferece aos usuários brasileiros acesso à compra, custódia e venda de criptomoedas (Bitcoin, Ethereum e stablecoin USDP) por meio de suas contas digitais, com transações a partir de R$ 1.</p>
<h3>Mercado Livre destaca &#8216;fenômeno único, global e coletivo&#8217; dos criptoativos como o bitcoin</h3>
<p>&#8220;As criptomoedas e a tecnologia blockchain representam um fenômeno único, global e coletivo que quebra barreiras e cria um ambiente aberto e nivelado para que todos os consumidores alcancem o empoderamento econômico, o que está muito alinhado com nossa missão como empresa&#8221;, diz por meio de nota André Chaves, vice-presidente sênior de Estratégia e Desenvolvimento Corporativo do Mercado Livre para América Latina.</p>
<p>&#8220;Estamos empolgados pelo Mercado Livre juntar-se à 2TM e MercadoBitcoin.com.br como acionista&#8221;, afirma Daniel Cunha, vice-presidente executivo de Desenvolvimento Corporativo do Grupo 2TM.</p>
<p>Por sua vez, Walter Hessert, chefe de Estratégia da Paxos, diz que &#8220;o Mercado Livre foi a primeira grande plataforma a dar acesso a criptomoedas e stablecoin aos seus usuários no Brasil. Esse investimento na Paxos é um sinal forte da dedicação da companhia para liderar a adoção de ativos digitais, em larga escala, por toda América Latina.&#8221; (AE)</p>

<div id="abra_sua_conta" class="mt-2 mb-4">
  <form class="lead-contact p-md-5 p-3" action="https://oespecialista.com.br/wp-json/safra/v1/lead" type="POST" id="s-report">
      <h3 class="title-abra-sua-conta mb-4">Abra sua conta</h3>

      <!-- <input type="hidden" name="_ri_" value="X0Gzc2X%3DAQpglLjHJlDQGhzgFzcHWLRBzbTgrjAbOaWT3pn72MSk3qzf3ib7mfVwjpnpgHlpgneHmgJoXX0Gzc2X%3DAQpglLjHJlDQGNPisAzbzeI9AzatEKjhj8jKpTn72MSk3qzf3ib7mf"> -->
      <!-- <input type="hidden" name="_ei_" value="EvfdV6Yh62kr8ZoeMqkjIwc"> -->
      <!-- <input type="hidden" name="_di_" value="ut85orsrgpa7tuakto09rmcsv4mn073rpuupl0iu39magtkotfg0"> -->
      <input type="hidden" name="ORIGEM" value="especialita-cartoes">
      <input type="hidden" name="MOBILE_COUNTRY_" value="BR">

      <div class="form-group">
                      <input type="text" class="form-control" name="NOME" placeholder="Nome" id="nome" required data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"preencheu","eventLabel":"nome"},"settings":{"eventType":"blur","validValue":true}}' />
      </div>

      <div class="form-group">
                      <input type="text"class="form-control"  name="EMAIL_ADDRESS_" placeholder="E-mail" required data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"preencheu","eventLabel":"email"},"settings":{"eventType":"blur","validValue":true}}' />
      </div>

      <!-- <div class="form-group">
          <?//php $auxDataGA = formatEventJSON([
              //'set' => [
                //  'contentGroup1' => 'esp:hub:abra-sua-conta',
             // ],
            //  'event' => [
            //      'eventCategory' => 'esp:hub:abra-sua-conta',
          //        'eventAction' => 'preencheu',
          //        'eventLabel' => 'telefone',
           //   ],
           //   'settings' => [
           //       'eventType' => 'blur',
           //       'validValue' => true
           //   ]
         // ]); ?>
          <input type="text"class="form-control"  id="telefone" name="MOBILE_NUMBER_" placeholder="Telefone" data-mask-selectonfocus="true" required data-ga='<?//= $auxDataGA ?>' />
      </div> -->

      <!-- <div class="form-group">
          <?//php $auxDataGA = formatEventJSON([
            //  'set' => [
            //      'contentGroup1' => 'esp:hub:abra-sua-conta',
             // ],
             // 'event' => [
              //    'eventCategory' => 'esp:hub:abra-sua-conta',
                //  'eventAction' => 'preencheu',
                  // 'eventLabel' => 'cpf',
              //],
               //'settings' => [
                 // 'eventType' => 'blur',
                 // 'validValue' => true
             // ]
           //]); ?>
          <input type="text"class="form-control"  name="CUSTOMER_ID_" placeholder="CPF" required data-ga='<?//= $auxDataGA ?>' />
      </div> -->

      <div class="form-group">
          
          <select class="form-control" name="RENDA" id="renda" form="s-report" required data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"preencheu","eventLabel":"renda"},"settings":{"eventType":"blur","validValue":true}}'>
              <option value="" >Renda Declarada </option>
              <option value="até R$ 2 mil">até R$ 2 mil</option>
              <option value="de R$ 2 mil a R$ 5 mil">de R$ 2 mil a R$ 5 mil</option>
              <option value="de R$ 5 mil a R$ 8 mil">de R$ 5 mil a R$ 8 mil</option>
              <option value="de R$ 8 mil a R$ 12 mil">de R$ 8 mil a R$ 12 mil</option>
              <option value="de R$ 12 mil a R$ 25 mil">de R$ 12 mil a R$ 25 mil</option>
              <option value="acima de R$ 25 mil">acima de R$ 25 mil</option>
              <!-- <option value="2000">até R$ 2 mil</option>
              <option value="20005000">de R$ 2 mil a R$ 5 mil</option>
              <option value="50008000">de R$ 5 mil a R$ 8 mil</option>
              <option value="800012000">de R$ 8 mil a R$ 12 mil</option>
              <option value="1200025000">de R$ 12 mil a R$ 25 mil</option>
              <option value="25000">acima de R$ 25 mil</option> -->
          </select>

      </div>

              <button class="btn btn-primary" type="submit" data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"clicou","eventLabel":"botao:cadastrar","eventValue":"1"}}'>Cadastrar</button>

      <input type="checkbox" class="form-check-input ml-0 mr-2 position-relative" checked required />

      <label>
          Ao preencher e enviar este formulário, você autoriza que o Safra entre em contato com você por celular, e-mail ou WhatsApp.
          Li e concordo com os <a style="color:#fff; text-decoration:underline;" href="https://www.safra.com.br/sobre/portal-da-privacidade-e-lgpd.htm?componente=#Politicas" target="_blank" >termos de uso e política de privacidade.</a>
      </label>

      <!-- Redirect fields -->
      <input type="hidden" name="até R$ 2 mil" value="https://oespecialista.com.br/oportunidade-ag-zero/" />
      <input type="hidden" name="de R$ 2 mil a R$ 5 mil" value="https://oespecialista.com.br/oportunidade-ag-zero/" />
      <input type="hidden" name="de R$ 5 mil a R$ 8 mil" value="https://oespecialista.com.br/oportunidade-ag-zero/" />
      <input type="hidden" name="de R$ 8 mil a R$ 12 mil" value="https://oespecialista.com.br/confirmacao-abra-sua-conta/" />
      <input type="hidden" name="de R$ 12 mil a R$ 25 mil" value="https://oespecialista.com.br/confirmacao-abra-sua-conta/" />
      <input type="hidden" name="acima de R$ 25 mil" value="https://oespecialista.com.br/confirmacao-abra-sua-conta/" />
  </form>
</div>
<!-- /#newsletter -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.10/jquery.mask.js"></script>
<script>
  $(document).ready(function(){
      $('#telefone').mask('+55 (00) 000000000');
      $('#telefone2').mask('+55 (00) 000000000');
  });

  jQuery('#nome').keyup(function() {
      let val = jQuery(this).val()
      val = val.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      jQuery(this).val(val)
  })

  //var semAcento = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
</script>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/mercado-livre-compra-mercado-bitcoin-e-paxos/">Mercado Livre compra participação no Mercado Bitcoin e Paxos</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></content:encoded>
        
  
  
    </item>
  <item>
  <title>Os melhores setores para investir em renda fixa</title>
  <link>https://oespecialista.com.br/os-melhores-setores-para-investimentos-em-credito-privado/</link>
  
  <dc:creator><![CDATA[Yuri Machado]]></dc:creator>
  <pubDate>Fri, 21 Jan 2022 11:35:48 +0000</pubDate>
      <category><![CDATA[Investimentos]]></category>
  <category><![CDATA[Análise Safra]]></category>
  <category><![CDATA[Banco Safra]]></category>
  <category><![CDATA[Carteira recomendada]]></category>
  <category><![CDATA[Crédito privado]]></category>
  <category><![CDATA[Debêntures]]></category>
  <guid isPermaLink="false">https://oespecialista.com.br/?p=148326</guid>

        <description><![CDATA[<p>Carteira recomendada para renda fixa tem mudanças e fica mais exposta aos setores de energia, mineração, transporte rodoviário e sucroalcooleiro</p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/os-melhores-setores-para-investimentos-em-credito-privado/">Os melhores setores para investir em renda fixa</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></description>
                  <content:encoded><![CDATA[
<p>O Banco Safra fez alterações na <a href="https://oespecialista.com.br/safra-report-investir-perfil-de-investidor-dezembro/" target="_blank" rel="noreferrer noopener">carteira recomendada de <strong>renda fixa</strong></a> para janeiro. Com isso, a <a href="https://oespecialista.com.br/eleicao-antecipa-captacoes-e-abre-oportunidades-em-renda-fixa/" target="_blank" rel="noreferrer noopener">carteira </a>ficou exposta aos setores de energia elétrica (geração), sucroalcooleiro, transporte rodoviário e mineração. </p>



<p>Com relação ao setor elétrico, o Safra mantém a visão mais positiva para as empresas, uma vez que o Operador Nacional do Sistema (ONS) destacou que há baixos riscos de racionamento de energia em 2022 e a previsão é de que os reservatórios do subsistema Sudeste e Centro-Oeste atinjam 58% até maio de 2022. No setor de açúcar e álcool, para a próxima safra o banco espera preços ainda atraentes e aumento na moagem, em comparação à safra atual.</p>



<p>No setor de mineração, a expectativa é uma demanda estável de minério de ferro por parte da China, uma vez que o estímulo do governo chinês deve se reduzir. Por outro lado, o plano de infraestrutura norte-americano deve puxar a demanda por aço. No transporte rodoviário, em 2021 acompanhamos importantes leilões e investimentose e para 2022, o governo espera leiloar mais de 13 mil km.</p>



<h3>Novos ativos para carteira de renda fixa de janeiro recomendadas pelo Banco Safra</h3>



<ul><li>ENJG21 (Companhia Energética Jaguara)</li></ul>



<ul><li>PLSB1A (Autopista Litoral Sul)</li></ul>



<ul><li>RIPR22 (Rio Paraná Energia). </li><li></li><li>Foram excluídos os títulos CPGT26, ENMI21 e CRA02100SC</li></ul>



<p></p>



<h3>Fatores que motivaram a revisão da carteira</h3>



<p>Cenário de macroeconomia, de acordo com as últimas atualizações do IBGE,  e o comportamento do mercado de crédito privado nos últimos meses.</p>



<h3>Macroeconomia</h3>



<p>Os dados de outubro divulgados pelo IBGE mostram uma possível desaceleração econômica para o quarto trimestre de 2021. Na comparação com setembro, a indústria de transformação manteve a tendência de queda, que está fortemente associada à falta de insumos nas cadeias de produção. Este efeito deve se perdurar até meados de 2022, dificultando a retomada da indústria.</p>



<p>Olhando para o varejo ampliado, cuja queda foi de 0,9% em comparação a setembro, o Safra destaca que a inflação na casa dos dois dígitos tem comprometido o poder aquisitivo das famílias. </p>



<p>Somado a isso, há o aumento no custo do crédito, refletindo a alta na Selic. No setor de serviços, houve contração de 1,2% em comparação a setembro. Entretanto, serviços prestados às famílias se destacam positivamente com alta de 2,7%. Espera-se avanço nesse subsetor, uma vez que a atividade se encontra abaixo dos níveis pré-pandemia.</p>



<p>No lado da demanda, o aumento esperado do consumo das famílias deve ser ligeiramente afetado pela alta inflacionária e o crédito mais caro, o que impacta o consumo de bens duráveis.</p>



<p>Em 2021, a inflação foi pressionada por algumas frentes, destacando-se: alimentos, em especial a proteína animal, energia elétrica e combustíveis. Algumas, pouco sensíveis à política monetária do país. </p>



<p>Previsões para 2022 mostram, a exceção de serviços, menor pressão dos grupos especiais do IPCA. Porém, o índice pode encerrar acima do teto da meta da inflação.</p>



<h3>Mercado de Crédito Privado</h3>



<p>O interesse pelo crédito privado tem aumentado diante de um cenário de alta inflacionária e aumentos consecutivos na taxa Selic. Em particular, as debêntures incentivadas foram bastante demandadas, primeiro pela proteção à inflação, prêmio atrativo e bom perfil de crédito dos emissores que, no geral, tiveram bons resultados no segundo semestre deste ano.</p>



<p>O fluxo comprador de debêntures incentivadas se refletiu na redução dos spreads (sobre a NTN-B) negociados no mercado secundário, que se caracteriza pela baixa liquidez. </p>



<p>Em particular, o Safra cita o forte fechamento das taxas de debêntures com vencimento no curto prazo, o que motivou a busca de oportunidades mais interessantes no médio e longo prazo para as carteiras. </p>



<p>Já no mercado primário, o Safra espera spreads mais atraentes, motivados, em parte, pela intenção de captação de recursos pelas empresas antes do período eleitoral.</p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/os-melhores-setores-para-investimentos-em-credito-privado/">Os melhores setores para investir em renda fixa</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></content:encoded>
        
  
  
    </item>
  <item>
  <title>Cripto acessível e líquido? Analista explica como investir em criptoativos</title>
  <link>https://oespecialista.com.br/como-investir-em-criptoativos-na-safra-corretora/</link>
  
  <dc:creator><![CDATA[Cauê Pinheiro]]></dc:creator>
  <pubDate>Thu, 20 Jan 2022 21:17:06 +0000</pubDate>
      <category><![CDATA[Investimentos]]></category>
  <category><![CDATA[Banco Safra]]></category>
  <category><![CDATA[Bitcoin]]></category>
  <category><![CDATA[Criptoativos]]></category>
  <category><![CDATA[Criptomoedas]]></category>
  <category><![CDATA[Fundos de investimento]]></category>
  <category><![CDATA[Safra corretora]]></category>
  <guid isPermaLink="false">https://oespecialista.com.br/?p=148019</guid>

        <description><![CDATA[<p>Por sua relevância cada vez maior nos mercados, diferentes produtos financeiros estão sendo criados para facilitar o investimento em criptoativos</p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/como-investir-em-criptoativos-na-safra-corretora/">Cripto acessível e líquido? Analista explica como investir em criptoativos</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></description>
                  <content:encoded><![CDATA[
<p>“Criptoativos” são ativos digitais extremamente variados e que em muitos casos apresentaram grande aumento de valor no passado recente. É importante conhecer as suas principais características, inclusive a de que é possível investir neles sem mergulhar em todos os detalhes da sua arquitetura. </p>



<p>Hoje há um número crescente desses ativos que são negociados em bolsas através de ETFs listados. Esses fundos nos permitem focar a decisão de investimento mais em função da expectativa de comportamento do preço desses ativos, do que das complexidades da sua operação na internet.</p>



<p>A principal característica dos criptoativos, nome dado a um amplo grupo de ativos digitais &#8211; dos quais o bitcoin foi o primeiro, lançado em 2009 &#8211; é que as transações realizadas com eles são, em última instancia, autenticadas por uma tecnologia chamada <a href="https://oespecialista.com.br/tecnologias-negocios-futuro/" target="_blank" rel="noreferrer noopener">blockchain</a>.</p>



<h3>Saiba mais</h3>



<ul><li><a href="https://oespecialista.com.br/criptomoedas-acoes-riscos-fmi/">Criptomoedas seguem movimento das ações e trazem novos riscos</a></li><li><a href="https://oespecialista.com.br/criptoativos-o-que-sao-como-funcionam-como-investir/">Criptoativos: como funcionam e como começar a investir</a></li><li><a href="https://www.safra.com.br/sobre/corretora.htm" target="_blank" rel="noreferrer noopener">Conheça os serviços da Safra Corretora</a></li></ul>



<p>O blockchain é um registro descentralizado de transações que permite acompanhar os ativos desde sua criação e todas as suas movimentações, sem receios de falsificação. Esse registro é decentralizado porque ele vive no ambiente da na internet, podendo ser replicado à vontade, mas alterado somente em circunstâncias especiais e se ninguém que possa mostrar que ela está errada a reprove. Assim, as transações podem ser confirmadas na internet sem a necessidade de uma autoridade central.</p>



<p>As aplicações potenciais do blockchain podem incluir transferências de fundos, liquidação de negociações, votação e muitas outras transações que não podem ser falsificadas facilmente.</p>



<p>Os criptoativos, foram inicialmente concebidos como um meio de pagamento ou moeda, ou seja, uma forma de transferir determinado valor de uma pessoa (ou conta) para outra, mediante instruções que não dependiam de interferência humana para sua execução. Logo se<br>viu que eles funcionam muito bem como como registro inviolável de propriedade.</p>



<p>Neste último caso, diz-se que os criptoativos têm um lastro e são uma representação (token) desse lastro, e contraste com criptoativos sem lastro, que valem apenas em função da sua própria demanda em escassez.</p>



<p>O bitcoin é o maior exemplo de um criptoativo sem lastro, que é apreciado por ser uma reserva de valor. Os criptoativos que representam ativos únicos &#8211; por exemplo, obras de arte não reproduzíveis &#8211; são chamados de NFT, ou “tokens não fungíveis”.</p>



<p>Além do bitcoin, a segunda maior criptomoeda do mercado atualmente é o Ethereum (ETH), que também é um ambiente em que se podem registrar contratos inteligentes (i.e., com instruções automáticas), tokens não fungíveis NFTs e outros criptoativos. O seu token é conhecido como Ether, e a validação das transações é mais simples e menos custosas do que aquela das transações no bitcoin, cuja pegada de carbono pode ser alta, dependendo onde essa validação (mining) ocorrer. Isso permite que permite que os usuários façam transações, usem e armazenem tokens não fungíveis (NFTs), negociem criptoativos, joguem, usem mídias sociais, entre outras funções. Os usuários da rede Ethereum podem criar, publicar, monetizar e usar uma gama diversificada de aplicativos, além de poder utilizar o Ether ou outra criptomoeda como pagamento.</p>



<p>Operar diretamente com bitcoins, Ethers e outras ativos desse grupo requer conhecimentos de computação avançados e poderia ser uma barreira para a expansão do seu uso. Mas a maior parte das pessoas não precisa negociar diretamente com bitcoins ou outros criptoativos “raiz”.</p>



<p>Hoje, já há diferentes produtos criados para facilitar o investimento nesses ativos, como é o caso dos ETF (Exchange Traded Funds) de criptoativos. Esse é um tipo de fundo que investe em cripotativos originais ou derivados, e cujas cotas podem ser negociados na bolsa de valores.</p>



<p>Para efeito de compra e venda, eles funcionam basicamente como qualquer outro ETF do mercado. Além de maior liquidez e facilidade de acesso, os ETF de criptoativos permitem maior diversificação pelos investidores, já que reduzem o esforço e os custos para comprar cada<br>ativo e/ou rebalancear a carteira regularmente. </p>



<h3>Confira as opções de investimentos em criptoativos que podem ser feitos pela Safra Corretora</h3>



<p>A B3 tem vários ETF com base em criptoativos listados, e descrevemos a seguir alguns dos principais que podem ser investidos através da Safra Corretora:</p>



<p>O <strong>HASH11</strong> é atualmente o terceiro maior ETF de cripto do mundo e o maior do Brasil, com o terceiro maior volume de ETF do país. O fundo oferece um investimento diversificado em criptoativos, possui um patrimônio líquido de R$1,59 bilhões e uma taxa de administração de<br>1,3%. O HASH11 segue o Nasdaq Crypto Index (NCI), uma cesta que oferece exposição aos cripto ativos de maior capitalização. O NCI foi desenvolvido pela Hashdex em parceria com a Nasdaq para representar o mercado cripto. O NCI é um índice dinâmico: o peso dos ativos varia continuamente com a flutuação dos preços. A seleção dos ativos é revista trimestralmente pelo Nasdaq Crypto Index Oversight Committee, com base em regras pré-estabelecidas na metodologia do NCI.</p>



<p>O <strong>BITH11</strong> é um ETF que acompanha os rendimentos do bitcoin através do Nasdaq bitcoin Reference Price. Ele é o primeiro ETF verde de cripto do Brasil, porque as emissões de CO2 associadas à validação decorrentes do investimento são compensadas com a compra de créditos de carbono e o financiamento de projetos de sustentabilidade na Amazônia. O fundo possui um patrimônio líquido de R$ 161,05 milhões e uma taxa de administração de 0,70%.</p>



<p>O ETF <strong>QBTC11</strong> também tem como objetivo seguir os rendimentos do bitcoin. O QBTC11 é lastreado por bitcoin físico, armazenados em custodiantes que, na visão da gestora, adotam os maiores padrões de segurança. O QBTC11 é negociado na B3 e tem operação autorizada pela CVM. O fundo possui atualmente um patrimônio líquido de R$ 208,27 milhões e sua taxa de administração é de 0,75% a.a. </p>



<p>O <strong>ETHE11</strong> é um ETF listado que busca acompanhar as variações da criptomoeda Ethereum através do índice de referência Nasdaq Ethereum Reference Price. Dessa forma, o EFT oferece exposição a essa plataforma de aplicativos descentralizados (DApps) e também ao principal<br>ativo que viabiliza a Web 3.0, uma infraestrutura descentralizada para a internet. O fundo possui um patrimônio líquido de R$ 145,03 milhões e uma taxa de administração de 0,70%.</p>



<p>O fundo <strong>QETH11</strong> também segue os rendimentos do Ethereum, utilizando o índice de referência CME CF Ether Reference Rate, que objetiva encontrar um preço de mercado para o criptoativo. O fundo possui um patrimônio líquido de R$ 152,92 milhões e uma taxa de administração de 0,75%.</p>



<p>A classe de ativos de criptoativos é volátil, especialmente no caso dos criptoativos sem lastro, como o bitcoin. Mas, como a oferta de ativos como o bitcoin é intrinsicamente limitada, a tendência do seu valor é subir, enquanto a demanda pelos serviços que ele pode proporcionais<br>continuar a crescer. Assim, com a abordagem certa, os investidores poderão diversificar suas carteiras, bem como se beneficiar da expansão desse mercado. </p>



<p>Essas possibilidades podem estar ao alcance e investidores brasileiros, através dos produtos oferecidos e negociados pela <a href="https://www.safra.com.br/investimentos/renda-variavel.htm" target="_blank" rel="noreferrer noopener"><strong>Safra Corretora.</strong></a></p>



<p></p>


<div id="abra_sua_conta" class="mt-2 mb-4">
  <form class="lead-contact p-md-5 p-3" action="https://oespecialista.com.br/wp-json/safra/v1/lead" type="POST" id="s-report">
      <h3 class="title-abra-sua-conta mb-4">Abra sua conta</h3>

      <!-- <input type="hidden" name="_ri_" value="X0Gzc2X%3DAQpglLjHJlDQGhzgFzcHWLRBzbTgrjAbOaWT3pn72MSk3qzf3ib7mfVwjpnpgHlpgneHmgJoXX0Gzc2X%3DAQpglLjHJlDQGNPisAzbzeI9AzatEKjhj8jKpTn72MSk3qzf3ib7mf"> -->
      <!-- <input type="hidden" name="_ei_" value="EvfdV6Yh62kr8ZoeMqkjIwc"> -->
      <!-- <input type="hidden" name="_di_" value="ut85orsrgpa7tuakto09rmcsv4mn073rpuupl0iu39magtkotfg0"> -->
      <input type="hidden" name="ORIGEM" value="especialita-cartoes">
      <input type="hidden" name="MOBILE_COUNTRY_" value="BR">

      <div class="form-group">
                      <input type="text" class="form-control" name="NOME" placeholder="Nome" id="nome" required data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"preencheu","eventLabel":"nome"},"settings":{"eventType":"blur","validValue":true}}' />
      </div>

      <div class="form-group">
                      <input type="text"class="form-control"  name="EMAIL_ADDRESS_" placeholder="E-mail" required data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"preencheu","eventLabel":"email"},"settings":{"eventType":"blur","validValue":true}}' />
      </div>

      <!-- <div class="form-group">
          <?//php $auxDataGA = formatEventJSON([
              //'set' => [
                //  'contentGroup1' => 'esp:hub:abra-sua-conta',
             // ],
            //  'event' => [
            //      'eventCategory' => 'esp:hub:abra-sua-conta',
          //        'eventAction' => 'preencheu',
          //        'eventLabel' => 'telefone',
           //   ],
           //   'settings' => [
           //       'eventType' => 'blur',
           //       'validValue' => true
           //   ]
         // ]); ?>
          <input type="text"class="form-control"  id="telefone" name="MOBILE_NUMBER_" placeholder="Telefone" data-mask-selectonfocus="true" required data-ga='<?//= $auxDataGA ?>' />
      </div> -->

      <!-- <div class="form-group">
          <?//php $auxDataGA = formatEventJSON([
            //  'set' => [
            //      'contentGroup1' => 'esp:hub:abra-sua-conta',
             // ],
             // 'event' => [
              //    'eventCategory' => 'esp:hub:abra-sua-conta',
                //  'eventAction' => 'preencheu',
                  // 'eventLabel' => 'cpf',
              //],
               //'settings' => [
                 // 'eventType' => 'blur',
                 // 'validValue' => true
             // ]
           //]); ?>
          <input type="text"class="form-control"  name="CUSTOMER_ID_" placeholder="CPF" required data-ga='<?//= $auxDataGA ?>' />
      </div> -->

      <div class="form-group">
          
          <select class="form-control" name="RENDA" id="renda" form="s-report" required data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"preencheu","eventLabel":"renda"},"settings":{"eventType":"blur","validValue":true}}'>
              <option value="" >Renda Declarada </option>
              <option value="até R$ 2 mil">até R$ 2 mil</option>
              <option value="de R$ 2 mil a R$ 5 mil">de R$ 2 mil a R$ 5 mil</option>
              <option value="de R$ 5 mil a R$ 8 mil">de R$ 5 mil a R$ 8 mil</option>
              <option value="de R$ 8 mil a R$ 12 mil">de R$ 8 mil a R$ 12 mil</option>
              <option value="de R$ 12 mil a R$ 25 mil">de R$ 12 mil a R$ 25 mil</option>
              <option value="acima de R$ 25 mil">acima de R$ 25 mil</option>
              <!-- <option value="2000">até R$ 2 mil</option>
              <option value="20005000">de R$ 2 mil a R$ 5 mil</option>
              <option value="50008000">de R$ 5 mil a R$ 8 mil</option>
              <option value="800012000">de R$ 8 mil a R$ 12 mil</option>
              <option value="1200025000">de R$ 12 mil a R$ 25 mil</option>
              <option value="25000">acima de R$ 25 mil</option> -->
          </select>

      </div>

              <button class="btn btn-primary" type="submit" data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"clicou","eventLabel":"botao:cadastrar","eventValue":"1"}}'>Cadastrar</button>

      <input type="checkbox" class="form-check-input ml-0 mr-2 position-relative" checked required />

      <label>
          Ao preencher e enviar este formulário, você autoriza que o Safra entre em contato com você por celular, e-mail ou WhatsApp.
          Li e concordo com os <a style="color:#fff; text-decoration:underline;" href="https://www.safra.com.br/sobre/portal-da-privacidade-e-lgpd.htm?componente=#Politicas" target="_blank" >termos de uso e política de privacidade.</a>
      </label>

      <!-- Redirect fields -->
      <input type="hidden" name="até R$ 2 mil" value="https://oespecialista.com.br/oportunidade-ag-zero/" />
      <input type="hidden" name="de R$ 2 mil a R$ 5 mil" value="https://oespecialista.com.br/oportunidade-ag-zero/" />
      <input type="hidden" name="de R$ 5 mil a R$ 8 mil" value="https://oespecialista.com.br/oportunidade-ag-zero/" />
      <input type="hidden" name="de R$ 8 mil a R$ 12 mil" value="https://oespecialista.com.br/confirmacao-abra-sua-conta/" />
      <input type="hidden" name="de R$ 12 mil a R$ 25 mil" value="https://oespecialista.com.br/confirmacao-abra-sua-conta/" />
      <input type="hidden" name="acima de R$ 25 mil" value="https://oespecialista.com.br/confirmacao-abra-sua-conta/" />
  </form>
</div>
<!-- /#newsletter -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.10/jquery.mask.js"></script>
<script>
  $(document).ready(function(){
      $('#telefone').mask('+55 (00) 000000000');
      $('#telefone2').mask('+55 (00) 000000000');
  });

  jQuery('#nome').keyup(function() {
      let val = jQuery(this).val()
      val = val.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      jQuery(this).val(val)
  })

  //var semAcento = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
</script>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/como-investir-em-criptoativos-na-safra-corretora/">Cripto acessível e líquido? Analista explica como investir em criptoativos</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></content:encoded>
        
  
  
    </item>
  <item>
  <title>Elza Soares, ícone da música brasileira, morre aos 91 anos</title>
  <link>https://oespecialista.com.br/morre-elza-soares/</link>
  
  <dc:creator><![CDATA[Redação]]></dc:creator>
  <pubDate>Thu, 20 Jan 2022 20:55:08 +0000</pubDate>
      <category><![CDATA[Estilo de vida]]></category>
  <category><![CDATA[Elza Soares]]></category>
  <category><![CDATA[Música]]></category>
  <guid isPermaLink="false">https://oespecialista.com.br/?p=148238</guid>

        <description><![CDATA[<p>Cantora morreu em casa, no Rio de Janeiro, de causas naturais, segundo informação de colegas de trabalho </p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/morre-elza-soares/">Elza Soares, ícone da música brasileira, morre aos 91 anos</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></description>
                  <content:encoded><![CDATA[
<p>A cantora Elza Soares morreu nesta quinta-feira, 20, aos 91 anos, em sua casa no Rio de Janeiro. De acordo com informações de sua assessoria, por meio de nota no Instagram, a intérprete teve morte por causas naturais.</p>



<p>Elza fez sucesso interpretando clássicos como &#8220;Se Acaso Você Chegasse&#8221;, cuja gravação lançou em 1960. Seu disco mais recente, Planeta Fome, é de 2019.</p>



<p>Em 2020, Elza foi homenageada com o enredo da escola de samba Mocidade Independente de Padre Miguel. Ela chegou a ser intérprete de sambas da agremiação.</p>



<p>Elza morreu no dia em que se completam 39 anos da morte de Garrincha, jogador de futebol com quem foi casada de 1966 até 1982. Eles tiveram um filho, Garrinchinha, que morreu em 1986, em um acidente de carro.</p>



<p>Em um dos últimos vídeos postados nas redes sociais, Elza Soares enviou uma mensagem de paz aos brasileiros.</p>



<p>&#8220;Que possa ter comida na mesa de todas as famílias e principalmente para quem está na rua sem ter o que comer. Que saibamos dividir o que pudermos com nossos irmãos&#8221;.</p>



<h3>Nota de falecimento foi publicada no porfil de Elza Soares no Instagram</h3>



<p>O comunicado sobre a morte da cantora foi publicado no <a href="https://www.instagram.com/p/CY9wedWLLcC/" target="_blank" rel="noreferrer noopener">perfil de Elza Soares no Instagram</a>:</p>



<p>“É com muita tristeza e pesar que informamos o falecimento da cantora e compositora Elza Soares, aos 91 anos, às 15 horas e 45 minutos em sua casa, no Rio de Janeiro, por causas naturais. Ícone da música brasileira, considerada uma das maiores artistas do mundo, a cantora eleita como a Voz do Milênio teve uma vida apoteótica, intensa, que emocionou o mundo com sua voz, sua força e sua determinação. A amada e eterna Elza descansou, mas estará para sempre na história da música e em nossos corações e dos milhares fãs por todo mundo.<br>Feita a vontade de Elza Soares, ela cantou até o fim”.  </p>



<p>A nota é assinada por Pedro Loureiro, Vanessa Soares, familiares e Equipe Elza.</p>



<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="500" data-dnt="true"><p lang="pt" dir="ltr">Feliz Natal, gentem! Que possa ter comida na mesa de todas as famílias e principalmente para quem está na rua sem ter o que comer. Que saibamos dividir o que pudermos com nossos irmãos. <a href="https://t.co/qqxDHOAt2D">pic.twitter.com/qqxDHOAt2D</a></p>&mdash; Elza Soares (@ElzaSoares) <a href="https://twitter.com/ElzaSoares/status/1474873695608913921?ref_src=twsrc%5Etfw">December 25, 2021</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>



<p></p>



<figure class="wp-block-embed is-type-rich is-provider-twitter wp-block-embed-twitter"><div class="wp-block-embed__wrapper">
<blockquote class="twitter-tweet" data-width="500" data-dnt="true"><p lang="pt" dir="ltr">Quanta tristeza! A nossa DIVA Elza Soares fez sua passagem hoje. A Voz do Milênio, Elza é uma referência de mulher, artista e ser humano. Elza é eterna! <br><br>Eu agradeço por sua passagem iluminada nesse mundo. Que Olorum a receba em festa&#8230;<a href="https://twitter.com/ElzaSoares?ref_src=twsrc%5Etfw">@ElzaSoares</a> sempre presente! <a href="https://t.co/WUthMTttRQ">pic.twitter.com/WUthMTttRQ</a></p>&mdash; Leci Brandão (@lecibrandao) <a href="https://twitter.com/lecibrandao/status/1484267674284744711?ref_src=twsrc%5Etfw">January 20, 2022</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div></figure>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/morre-elza-soares/">Elza Soares, ícone da música brasileira, morre aos 91 anos</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></content:encoded>
        
  
  
    </item>
  <item>
  <title>Fed abre consulta pública para criar moeda digital</title>
  <link>https://oespecialista.com.br/federal-reserve-moeda-digital/</link>
  
  <dc:creator><![CDATA[Redação]]></dc:creator>
  <pubDate>Thu, 20 Jan 2022 20:07:06 +0000</pubDate>
      <category><![CDATA[Economia]]></category>
  <category><![CDATA[Investimentos]]></category>
  <category><![CDATA[Dólar]]></category>
  <category><![CDATA[Estados Unidos]]></category>
  <category><![CDATA[Federal Reserve]]></category>
  <category><![CDATA[moeda digital]]></category>
  <category><![CDATA[Política monetária]]></category>
  <guid isPermaLink="false">https://oespecialista.com.br/?p=148214</guid>

        <description><![CDATA[<p>Banco Central dos Estados Unidos divulga documento que abre debate sobre como e quando deve ser criada a moeda digital do Fed</p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/federal-reserve-moeda-digital/">Fed abre consulta pública para criar moeda digital</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></description>
                  <content:encoded><![CDATA[
<p>O Federal Reserve divulgou hoje um documento de discussão que examina os prós e contras de uma possível moeda digital do banco central dos Estados Unidos. A proposta é a criação de uma CBDC, sigla para Central Bank Digital Currency – ou Moeda Digital Emitida por Banco Central. </p>



<p>O convite da autoridade monetária dos Estados Unidos para comentários do público é o primeiro passo da discussão sobre se a CBDC poderia melhorar o sistema de pagamentos doméstico, tornando-o mais seguro e eficaz, e como deveria ser implantada.</p>



<p>O documento não favorece nenhum resultado político a favor ou contra a proposta. &#8220;Estamos ansiosos para nos envolver com o público, representantes eleitos e uma ampla gama de partes interessadas enquanto examinamos os pontos positivos e negativos de uma moeda digital do banco central nos Estados Unidos&#8221;, disse o presidente do Federal Reserve, Jerome Powell. </p>



<p>O artigo resume o estado atual do sistema de pagamentos doméstico e discute os diferentes tipos de métodos e ativos de pagamento digital que surgiram nos últimos anos, incluindo stablecoins e outras criptomoedas. </p>



<h3>Federal Reserve examina potenciais benefícios da moeda digital</h3>



<p>Ele conclui examinando os potenciais benefícios e riscos de uma CBDC e identifica considerações políticas específicas. </p>



<p>Consumidores e empresas há muito tempo mantêm e transferem dinheiro em formulários digitais, por meio de contas bancárias, transações on-line ou aplicativos de pagamento. </p>



<p>As formas de dinheiro usadas nessas transações são passivos de entidades privadas, como bancos comerciais. Por outro lado, um CBDC seria um passivo de um banco central, como o Federal Reserve. </p>



<p></p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/federal-reserve-moeda-digital/">Fed abre consulta pública para criar moeda digital</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></content:encoded>
        
  
  
    </item>
  <item>
  <title>Para Campos Neto, prioridade é retomar o crescimento</title>
  <link>https://oespecialista.com.br/eleicao-polarizada-ja-afeta-cambio-diz-presidente-do-banco-central/</link>
  
  <dc:creator><![CDATA[Redação]]></dc:creator>
  <pubDate>Thu, 20 Jan 2022 19:31:10 +0000</pubDate>
      <category><![CDATA[Economia]]></category>
  <category><![CDATA[Banco central]]></category>
  <category><![CDATA[Câmbio]]></category>
  <category><![CDATA[Dólar]]></category>
  <category><![CDATA[Política monetária]]></category>
  <guid isPermaLink="false">https://oespecialista.com.br/?p=148198</guid>

        <description><![CDATA[<p>Com perspectiva de queda na inflação, Campos Neto destaca crescimento como prioridade e diz que ciclo de alta de jutos está perto do fim</p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/eleicao-polarizada-ja-afeta-cambio-diz-presidente-do-banco-central/">Para Campos Neto, prioridade é retomar o crescimento</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></description>
                  <content:encoded><![CDATA[<p>O presidente do Banco Central, Roberto Campos Neto, avaliou nesta quinta-feira que melhor forma que o BC pode contribuir para o <a href="https://oespecialista.com.br/brasil-cai-em-ranking-de-interesse-em-investimentos/" target="_blank" rel="noopener">crescimento da economia</a> é atacando a inflação. Segundo ele, o ciclo de alta da taxa de juros está perto do fim.</p>
<p>&#8220;Temos uma memória muito forte de inflação e indexação no Brasil, por isso temos que atacar de maneira eficaz esse problema&#8221;, afirmou Campos Neto, em participação na Conferência Anual Latino-Americana do Santander. Segundo ele, a performance da agropecuária é muito importante para o desempenho da economia, mas eventos climáticos podem afetar ainda mais as expectativas de crescimento do Produto Interno Bruto (PIB) em 2022.</p>
<h3>Campos Neto defende reformas para aumentar crescimento</h3>
<p>&#8220;Quase todos os fatores que as pessoas culpavam pelo baixo crescimento no passado foram endereçados. Precisamos debater que tipo de reformas precisam ser feitas para aumentar a crença no crescimento brasileiro&#8221;, afirmou o presidente do BC.</p>
<p>Segundo ele, taxa estrutural de crescimento da economia brasileira será fundamental para a correção da trajetória fiscal brasileira. Ele destacou que o mercado tem projetado um crescimento estrutural menor, apesar de reformas aprovadas nos últimos anos.</p>
<p>&#8220;No curto e mesmo no médio prazo, o Brasil não tem mostrado capacidade de crescimento sustentável, e isso impacta as previsões para o fiscal. Com juros maiores e crescimento menor, a trajetória da dívida tende a ir para outro nível. O debate passa por qual taxa de crescimento o Brasil pode ou deveria ter, e as reformas necessárias para se obter isso&#8221;, afirmou Campos Neto, em participação na Conferência Anual Latino-Americana do Santander.</p>
<h3>Deslocamento da demanda de serviços para bens</h3>
<p>Ele voltou a avaliar que o deslocamento da demanda de serviços para bens continua a ser percebida na economia brasileira, com pressões no consumo de energia, o que torna a inflação mais persistente.</p>
<p>&#8220;Nos Estados Unidos, diferença entre demanda de bens e serviços têm caído, mas ainda está muito distante dos níveis pré-pandemia&#8221;, comparou, em participação na Conferência Anual Latino-Americana do Santander.</p>
<p>Campos Neto admitiu que a aprovação da PEC dos Precatórios com um espaço fiscal de mais R$ 100 bilhões a mais para o governo 2022 levou à interpretação do mercado de que o teto de gastos havia sido desrespeitado. Ele voltou a argumentar, porém, que os resultados fiscais brasileiros no ano passado foram melhores do que os anteriormente projetados.</p>
<p>O presidente do BC reconheceu que parte do aumento da arrecadação no ano passado se deveu à alta de inflação, mas apontou mudanças estruturais no consumo e no recolhimento de impostos que devem permanecer.</p>
<p>Campos Neto alegou que, apesar da aprovação de reformas nos últimos anos, as projeções de crescimento da economia brasileira para os anos à frente na verdade caíram.</p>
<h3>Transição para a economia verde</h3>
<p>O presidente do Banco Central alertou que os debates de transição para economia verde estão levando em consideração efeito em preços na exploração de matérias-primas necessárias para a fabricação de componentes usados em carros elétricos, por exemplo.</p>
<p>Além disso, Campos Neto repetiu que os investimentos na ampliação da produção de energia limpa não têm conseguido acompanhar a demanda.</p>
<p>O presidente do Banco Central disse também que, apesar da nova onda de contaminações de covid-19 com a variante Ômicron, o numero de hospitalizações não tem crescido tanto. O próprio chefe da autoridade monetária testou positivo para o vírus no começo deste ano.</p>
<p>&#8220;É claro que ainda temos um problema, com pessoas não vacinadas sendo internadas. Mas em termos de mobilidade, não há um grande impacto. Há questão na China, mas estamos navegando melhor com Ômicron, com pequeno efeito em cadeias&#8221;, afirmou o presidente do BC.</p>
<p>Campos Neto admitiu que o crescimento brasileiro tem ficado estagnado nos últimos meses, ficando atrás de outros países emergentes. &#8220;Há um desafio para crescimento na América Latina no pós-pandemia&#8221;, acrescentou.</p>
<p><span style="font-size: revert; color: initial;">&#8220;As ações em países desenvolvidos estão indo muito bem, com empresas de software indo melhor&#8221;, destacou. (AE)</span></p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/eleicao-polarizada-ja-afeta-cambio-diz-presidente-do-banco-central/">Para Campos Neto, prioridade é retomar o crescimento</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></content:encoded>
        
  
  
    </item>
  <item>
  <title>Petróleo sobe e pode causar novo reajuste de combustíveis no Brasil</title>
  <link>https://oespecialista.com.br/petroleo-novo-reajuste-de-combustiveis/</link>
  
  <dc:creator><![CDATA[Redação]]></dc:creator>
  <pubDate>Thu, 20 Jan 2022 18:22:11 +0000</pubDate>
      <category><![CDATA[Economia]]></category>
  <category><![CDATA[Emirados Árabes]]></category>
  <category><![CDATA[Iêmem]]></category>
  <category><![CDATA[Inflação]]></category>
  <category><![CDATA[Petrobras]]></category>
  <category><![CDATA[Petróleo]]></category>
  <guid isPermaLink="false">https://oespecialista.com.br/?p=148176</guid>

        <description><![CDATA[<p>Tensão no mercado internacional com risco de queda na oferta de petróleo eleva cotação e pode causar novos reajustes da Petrobras</p>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/petroleo-novo-reajuste-de-combustiveis/">Petróleo sobe e pode causar novo reajuste de combustíveis no Brasil</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></description>
                  <content:encoded><![CDATA[
<p>Ataques de combatentes da etnia Houthi, do Iêmen, a tanques de combustíveis nos Emirados Árabes fizeram o preço de petróleo subir. Uma explosão no principal oleoduto que liga Iraque e Turquia aumentou os temores de problemas de oferta, o que tem impacto nos preços.</p>



<p>Fluxo de transportes de petróleo já foi restabelecido, mas o preço do Brent segue em um patamar alto. Preço dos combustíveis no Brasil poderiam ser reajustados novamente, segundo avaliação do Banco Safra enviada aos clientes.</p>



<p>O mercado também enfrenta tensões envolvendo outros produtores, como a Rússia, que ameaça invadir a Ucrânia. Pelo lado da demanda, a Agência Internacional de Energia (AIE) previu que a busca pela commodity irá superar níveis pré-pandemia neste ano. A queda do dólar ante outras moedas deu ainda mais impulso ao petróleo, cotado na moeda americana.</p>



<p>A alta na cotação reflete o temor de investidores de problemas na oferta da commodity, no momento em que o mercado ainda enfrenta problemas decorrentes da onda da variante ômicron de covid-19.</p>



<p>Os houthis derrubaram o governo do Iêmen no final de 2014, levando a coalizão árabe a intervir. O grypo assumiu o ataque e disse ter lançado cinco mísseis balísticos e &#8220;um grande número&#8221; de drones contra os aeroportos de Dubai e Abu Dhabi e contra locais &#8220;sensíveis&#8221; dos Emirados, incluindo a refinaria de Musaffah.</p>



<h3>Contratos futuros de petróleo renovam máxima em sete anos</h3>



<p>Na quarta-feira os contratos futuros de petróleo fecharam em alta, renovando máximas em sete anos, em mais uma sessão marcada por intensas preocupações com a oferta.</p>



<p>O oleoduto tacado transporta até 450 mil barris por dia dos campos de petróleo no norte do Iraque para o porto mediterrâneo de Ceyhan, na Turquia.</p>



<p>A Rystad Energy atribui o avanço recente da commodity aos desequilíbrios entre oferta e demanda, com inesperados cortes de produção em países como Líbia, Equador e Casaquistão. &#8220;O impasse geopolítico entre os EUA e a Rússia corre o risco de provocar uma guerra de gás e estimularia a demanda incremental por petróleo&#8221;, explica a consultoria, que cita ainda as dificuldades nas negociações sobre o acordo nuclear com o Irã.</p>



<p>O relatório mensal da Agência Internacional de Emergia (AIE) elevou a previsão de alta para o consumo mundial de petróleo em 2022 em 200 mil barris por dia (bpd), a 3,3 milhões e bpd.</p>



<p>O mercado mais apertado levou a Capital Economics a elevar suas expectativas para o Brent ao final do ano, que agora deve terminar em US$ 70 o barril e não mais US$ 60, como na projeção anterior. (Com AE)</p>


<div id="abra_sua_conta" class="mt-2 mb-4">
  <form class="lead-contact p-md-5 p-3" action="https://oespecialista.com.br/wp-json/safra/v1/lead" type="POST" id="s-report">
      <h3 class="title-abra-sua-conta mb-4">Abra sua conta</h3>

      <!-- <input type="hidden" name="_ri_" value="X0Gzc2X%3DAQpglLjHJlDQGhzgFzcHWLRBzbTgrjAbOaWT3pn72MSk3qzf3ib7mfVwjpnpgHlpgneHmgJoXX0Gzc2X%3DAQpglLjHJlDQGNPisAzbzeI9AzatEKjhj8jKpTn72MSk3qzf3ib7mf"> -->
      <!-- <input type="hidden" name="_ei_" value="EvfdV6Yh62kr8ZoeMqkjIwc"> -->
      <!-- <input type="hidden" name="_di_" value="ut85orsrgpa7tuakto09rmcsv4mn073rpuupl0iu39magtkotfg0"> -->
      <input type="hidden" name="ORIGEM" value="especialita-cartoes">
      <input type="hidden" name="MOBILE_COUNTRY_" value="BR">

      <div class="form-group">
                      <input type="text" class="form-control" name="NOME" placeholder="Nome" id="nome" required data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"preencheu","eventLabel":"nome"},"settings":{"eventType":"blur","validValue":true}}' />
      </div>

      <div class="form-group">
                      <input type="text"class="form-control"  name="EMAIL_ADDRESS_" placeholder="E-mail" required data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"preencheu","eventLabel":"email"},"settings":{"eventType":"blur","validValue":true}}' />
      </div>

      <!-- <div class="form-group">
          <?//php $auxDataGA = formatEventJSON([
              //'set' => [
                //  'contentGroup1' => 'esp:hub:abra-sua-conta',
             // ],
            //  'event' => [
            //      'eventCategory' => 'esp:hub:abra-sua-conta',
          //        'eventAction' => 'preencheu',
          //        'eventLabel' => 'telefone',
           //   ],
           //   'settings' => [
           //       'eventType' => 'blur',
           //       'validValue' => true
           //   ]
         // ]); ?>
          <input type="text"class="form-control"  id="telefone" name="MOBILE_NUMBER_" placeholder="Telefone" data-mask-selectonfocus="true" required data-ga='<?//= $auxDataGA ?>' />
      </div> -->

      <!-- <div class="form-group">
          <?//php $auxDataGA = formatEventJSON([
            //  'set' => [
            //      'contentGroup1' => 'esp:hub:abra-sua-conta',
             // ],
             // 'event' => [
              //    'eventCategory' => 'esp:hub:abra-sua-conta',
                //  'eventAction' => 'preencheu',
                  // 'eventLabel' => 'cpf',
              //],
               //'settings' => [
                 // 'eventType' => 'blur',
                 // 'validValue' => true
             // ]
           //]); ?>
          <input type="text"class="form-control"  name="CUSTOMER_ID_" placeholder="CPF" required data-ga='<?//= $auxDataGA ?>' />
      </div> -->

      <div class="form-group">
          
          <select class="form-control" name="RENDA" id="renda" form="s-report" required data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"preencheu","eventLabel":"renda"},"settings":{"eventType":"blur","validValue":true}}'>
              <option value="" >Renda Declarada </option>
              <option value="até R$ 2 mil">até R$ 2 mil</option>
              <option value="de R$ 2 mil a R$ 5 mil">de R$ 2 mil a R$ 5 mil</option>
              <option value="de R$ 5 mil a R$ 8 mil">de R$ 5 mil a R$ 8 mil</option>
              <option value="de R$ 8 mil a R$ 12 mil">de R$ 8 mil a R$ 12 mil</option>
              <option value="de R$ 12 mil a R$ 25 mil">de R$ 12 mil a R$ 25 mil</option>
              <option value="acima de R$ 25 mil">acima de R$ 25 mil</option>
              <!-- <option value="2000">até R$ 2 mil</option>
              <option value="20005000">de R$ 2 mil a R$ 5 mil</option>
              <option value="50008000">de R$ 5 mil a R$ 8 mil</option>
              <option value="800012000">de R$ 8 mil a R$ 12 mil</option>
              <option value="1200025000">de R$ 12 mil a R$ 25 mil</option>
              <option value="25000">acima de R$ 25 mil</option> -->
          </select>

      </div>

              <button class="btn btn-primary" type="submit" data-ga='{"set":{"contentGroup1":"esp:hub:abra-sua-conta"},"event":{"eventCategory":"esp:hub:abra-sua-conta","eventAction":"clicou","eventLabel":"botao:cadastrar","eventValue":"1"}}'>Cadastrar</button>

      <input type="checkbox" class="form-check-input ml-0 mr-2 position-relative" checked required />

      <label>
          Ao preencher e enviar este formulário, você autoriza que o Safra entre em contato com você por celular, e-mail ou WhatsApp.
          Li e concordo com os <a style="color:#fff; text-decoration:underline;" href="https://www.safra.com.br/sobre/portal-da-privacidade-e-lgpd.htm?componente=#Politicas" target="_blank" >termos de uso e política de privacidade.</a>
      </label>

      <!-- Redirect fields -->
      <input type="hidden" name="até R$ 2 mil" value="https://oespecialista.com.br/oportunidade-ag-zero/" />
      <input type="hidden" name="de R$ 2 mil a R$ 5 mil" value="https://oespecialista.com.br/oportunidade-ag-zero/" />
      <input type="hidden" name="de R$ 5 mil a R$ 8 mil" value="https://oespecialista.com.br/oportunidade-ag-zero/" />
      <input type="hidden" name="de R$ 8 mil a R$ 12 mil" value="https://oespecialista.com.br/confirmacao-abra-sua-conta/" />
      <input type="hidden" name="de R$ 12 mil a R$ 25 mil" value="https://oespecialista.com.br/confirmacao-abra-sua-conta/" />
      <input type="hidden" name="acima de R$ 25 mil" value="https://oespecialista.com.br/confirmacao-abra-sua-conta/" />
  </form>
</div>
<!-- /#newsletter -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.10/jquery.mask.js"></script>
<script>
  $(document).ready(function(){
      $('#telefone').mask('+55 (00) 000000000');
      $('#telefone2').mask('+55 (00) 000000000');
  });

  jQuery('#nome').keyup(function() {
      let val = jQuery(this).val()
      val = val.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      jQuery(this).val(val)
  })

  //var semAcento = texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
</script>
<p>O post <a rel="nofollow" href="https://oespecialista.com.br/petroleo-novo-reajuste-de-combustiveis/">Petróleo sobe e pode causar novo reajuste de combustíveis no Brasil</a> apareceu primeiro em <a rel="nofollow" href="https://oespecialista.com.br">O Especialista</a>.</p>
]]></content:encoded>
        
  
  
    </item>
</channel>
</rss>`;

  
  let xml;
  //let xmlnovo;

  const loadCalendar = async () => {

    await fetch("https://oespecialista.com.br/feed/home")
    .then(response => response.text())
    .then(data => {
      xml = data;
      setLoading(false);
    })
    .catch(error =>{
      console.error('O Especialista Error >>>>>> ',error);
      setLoading(false);
    });

    // await fetch("https://oespecialista.com.br/feed")
    //   .then(response => response.text())
    //   .then(res => {
    //     xmlnovo = res;
    //   })
    //   .catch(console.error);

    var xml2: any = await xml2js(xml, { compact: true });
    //var xmlAll: any = await xml2js(xmlnovo, { compact: true });
    //let dados = xmlAll.rss.channel.item;
    // let categorias = ['Últimas'];
    // dados.map((item) => {
    //   return (
    //     item.category.map((cat) => {
    //       if (categorias.indexOf(cat._cdata) === -1) {
    //         categorias.push(cat._cdata);
    //       }
    //     })
    //   );
    // });
    // setCategory(categorias);
    setItem(xml2.rss.channel.item);
    // setItemAllLast(xml2.rss.channel.item);
    // setItemAll(xmlAll.rss.channel.item);
  };

  const changeCat = (categoria: any) => {

    if(categoria == "Últimas") {
      setSelectedCategory(categoria);
      setItem(itemLast);
    } else {
      let valores = [];

      let magenicVendors = itemAll.map((vendor) => {
        vendor.category.filter((item) => {
          if (item._cdata === categoria) {
            valores.push(vendor);
          }
        });
      });


    setSelectedCategory(categoria);
    setItem(valores);
    }

    
  };

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id) => {
    selectedCategory == id ? setSelectedCategory(null) : setSelectedCategory(id);

    if(id == "Últimas") {
      setSelectedCategory(id);
      setItem(itemLast);
    } else {
      let valores = [];

      let magenicVendors = itemAll.map((vendor) => {
        vendor.category.filter((item) => {
          if (item._cdata === id) {
            valores.push(vendor);
          }
        });
      });


    setSelectedCategory(id);
    setItem(valores);
    }

    setOpen(false);

  };

  useEffect(() => {
    loadCalendar();
  }, []);

  return (
    <div className="DWWrapper DWCustom DWEspecialista">
      <div className="titleZone">
        <h3>{props.wpTitle}</h3>

        {/* Removido via CSS */}
        <div className="filter">
          <span className="filterText">Filtrar</span>
          {/* <select name="" id="" onChange={(el) => changeCat(el.target.value)}>
            {
              category.map((item) => {
                return (
                  <option value={item}>{item}</option>
                )
              })
            }
            <option value="Últimas">Últimas</option>
          </select> */}
          <div className={`dropdown  ${isOpen && 'open'}`}>
            <div className='dropdown-header' onClick={toggleDropdown}>
              {selectedCategory}
              <span className={`DWIconSetaDireita ${isOpen && "open"}`}></span>
            </div>
            <div className={`dropdown-body ${isOpen && 'open'}`}>
              {category.map(item2 => (
                <div className="dropdown-item" onClick={(el) => handleItemClick(el.currentTarget.textContent)}>
                  {item2}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="DWContainer">
        {
          loading ?
            <p>carregando...</p>
            :
              item && item.length > 0 ? 
              item.slice(0, props.qtdNoticias).map((link, index) => {
                return (
                  <div className="DWItem">
                    <span>{format(new Date(link.pubDate._text), 'dd.MM.yyyy')} - {selectedCategory == "Últimas" ? (link.category._cdata ? link.category._cdata : link.category[0]._cdata) : selectedCategory}</span>
                    <a className="DWContent" data-interception="off" href={link.link._text} target="_blank">{link.title._text}</a>
                    <p>{link.description._cdata.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, '')}</p>
                  </div>
                );
              })
                :
                <p>Não há itens a serem exibidos</p>
        }
      </div>
      <a href={props.urlLink} className="linkButton" target="_blank"><span className="DWIconAdicionar"></span><h5>{props.textLink}</h5></a>
    </div>
  );
};
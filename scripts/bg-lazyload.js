/**
 * Flickity background lazyload v2.0.0
 * lazyload background cell images
 */

(function(window, factory) {
  // universal module definition
  if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory(
        require('flickity'),
        require('fizzy-ui-utils')
    );
  } else {
    // browser global
    if (!window.Flickity || !window.fizzyUIUtils) {
      return;
    }
    factory(
        window.Flickity,
        window.fizzyUIUtils
    );
  }
}(window, function factory(Flickity, utils) {

  if (!Flickity || !utils) {
    return;
  }

  // restante do código...

  Flickity.create = Flickity.create || {};
  
  Flickity.create.bgLazyLoad = function() {
    this.on('select', this.bgLazyLoad);
  };
    
  
  let proto = Flickity.prototype;
  
  const bgLazyloadAttr = 'data-flickity-bg-lazyload';
  
  proto.bgLazyLoad = function() {
    let lazyLoad = this.options.bgLazyLoad;
    if ( !lazyLoad ) return;
  
    // get adjacent cells, use lazyLoad option for adjacent count
    let adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
    let cellElems = this.getAdjacentCellElements( adjCount );
  
    cellElems.forEach( ( cellElem ) => {
      this.bgLazyLoadElem( cellElem );
      // select lazy elems in cell
      let children = cellElem.querySelectorAll(`[${bgLazyloadAttr}]`);
      for ( let child of children ) {
        this.bgLazyLoadElem( child );
      }
    } );
  };
  
  proto.bgLazyLoadElem = function( elem ) {
    let attr = elem.getAttribute(bgLazyloadAttr);
    if (!attr) return;
  
  
    let onComplete = (event) => {
      this.dispatchEvent('bgLazyLoad', event, elem);
    };
    new BgLazyLoader(elem, attr, onComplete);
  };
  
  // -------------------------- LazyBGLoader -------------------------- //
  
  // class to handle loading images
  function BgLazyLoader( elem, url, onComplete ) {
    this.element = elem;
    this.url = url;
    this.img = new Image();
    this.onComplete = onComplete;
    this.load();
  }
  
  BgLazyLoader.prototype.handleEvent = utils.handleEvent;
  
  BgLazyLoader.prototype.load = function() {
    this.img.addEventListener('load', this.onload.bind(this));
    this.img.addEventListener('error', this.onerror.bind(this));
  
  
    this.img.src = this.url;  // Força o carregamento da imagem
    this.element.removeAttribute(bgLazyloadAttr);  // Remove o atributo após carregar
  };
  
  BgLazyLoader.prototype.onload = function(event) {
    this.element.style.backgroundImage = `url("${this.url}")`;
    this.complete(event, 'flickity-bg-lazyloaded');
  };
  
  BgLazyLoader.prototype.onerror = function(event) {
    this.complete(event, 'flickity-bg-lazyerror');
  };
  
  BgLazyLoader.prototype.complete = function( event, className ) {
    // unbind events
    this.img.removeEventListener( 'load', this );
    this.img.removeEventListener( 'error', this );
  
    this.element.classList.add( className );
    this.onComplete( event );
  };
  
  // -----  ----- //
  
  Flickity.BgLazyLoader = BgLazyLoader;
  
  return Flickity;
  
  } ) );

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    const { action } = request;
    if (action === 'printPage') {
      return openPreviewModal();
    }
});

function openPreviewModal() {
  const htmlPage = `
    <html>
      ${document.documentElement.innerHTML}
    </html>`;
  const html = `
    <div id="pagePrinter" class="modal tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg"" role="document" style="height: 100%">
        <div class="modal-content" style="height: 100%">
          <div class="modal-header">
            <button id="printBtn" class=btn btn-primary">print</button>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Modal title</h4>
          </div>
          <div class="modal-body" style="height: 100%">
            <!--- <iframe id="iframeId" class="pp" height="100%" width="100%"/> -->
            <iframe id="iframeId" height="100%" width="100%" />
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div>
  `;

  let div = document.getElementById('extContent');
  if(!div) {
    const div = document.createElement('div');
    div.classList.add('no-print', 'pp');
    div.id = 'extContent';
    document.body.appendChild(div);
    div.innerHTML = html;
  }

  $('#pagePrinter').modal('toggle');

  const pagePrinterIframe = document.getElementById('iframeId');
  pagePrinterIframe.contentDocument.open();
  pagePrinterIframe.contentDocument.write(htmlPage);
  pagePrinterIframe.contentDocument.close();

  $('#iframeId').on('load', () => {
    const link  = pagePrinterIframe.contentDocument.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.runtime.getURL('css/iframe.css');
    link.media = 'all';
    const head = pagePrinterIframe.contentDocument.getElementsByTagName('head')[0];
    head.appendChild(link);
    const a = $('#iframeId').contents().find('a');
    a.click(function(e){e.preventDefault()});
    const elements = $('#iframeId').contents().find(`
      div,
      span,
      p,
      a,
      table,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      input,
      li,
      ul,
      button,
      select,
      header,
      img,
      article,
      footer,
      form,
      label,
      svg,
      rect,
      nav
    `);

    elements.mouseover(function(event) {
      console.log(elements);
      event.stopPropagation();
      $('#iframeId').contents().find('.pagePrinter--over').removeClass('pagePrinter--over');
      $(this).addClass('pagePrinter--over');
      $(this).on('click', function(event) {
        event.stopPropagation();
   //     $(this).addClass('pagePrinter--hidden');
   console.log($(this));
      $(this).remove();
      });
    });
  });

  $('#printBtn').on('click', function () {
    printFrame('iframeId');
  });
}

function printFrame(id) {
  var frm = document.getElementById(id).contentWindow;
  frm.print();
  return false;
}

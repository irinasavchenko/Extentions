chrome.runtime.onMessage.addListener(
  function(request, sender) {
    if(request.action === "printPage") {
      openPreviewModal();
    }
  });

  function openPreviewModal() {
    const pageHtml = `<html> ${document.documentElement.innerHTML}</html>`;
    const modalHtml =
      `<div id="pagePrinter" class="modal hidden-print" tabindex="-1" role="dialog">
        <div class="modal-dialog.modal-lg modal-dialog-scrollable fullSize">
          <div class="modal-content fullSize">
            <div class="modal-header">
              <button type="button" id="openPrinterPage" class="btn btn-primary btn-sm">Print</button>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body fullSize">
              <iframe id="pagePrinterIframe" width="100%" height="100%" allowfullscreen />
            </div>
          </div>
        </div>
      </div>`;

    let div = document.getElementById('extContent');

    if(!div) {
      div = document.createElement('div');
      div.id = 'extContent';
      div.innerHTML = modalHtml;
      document.body.appendChild(div);
    }

    const pagePrinterIframe = document.getElementById('pagePrinterIframe')

    pagePrinterIframe.contentDocument.open();
    pagePrinterIframe.contentDocument.write(pageHtml);
    pagePrinterIframe.contentDocument.close();

  // works in the most cases. but sometimes there are errors with this attribute
  //  pagePrinterIframe.srcdoc = pageHtml;
    $('#pagePrinter').modal('toggle');
    $('#openPrinterPage').on('click', function() {
      window.print();
    });
  }
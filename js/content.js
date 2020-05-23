chrome.runtime.onMessage.addListener(
  function(request, sender) {
    console.log(request, sender, document.URL);
    if(request.action = "printPage") {
      openPreviewModal();
    }
  });

  function openPreviewModal() {
    const html =   
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
              <iframe src="${document.URL}" width="100%" height="100%" allowfullscreen />
            </div>
          </div>
        </div>
      </div>`;

    let div = document.getElementById('extContent'); 

    if(!div) {
      div = document.createElement('div');
      div.id = 'extContent';
      div.innerHTML = html;
      document.body.appendChild(div);
    }

    $('#pagePrinter').modal('toggle');
    $('#openPrinterPage').on('click', function() {
      window.print();
    });
  }
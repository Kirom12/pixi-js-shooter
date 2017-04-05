// attendre que le HTML sois prêt avant de lancer le preloader du jeu
window.addEventListener("DOMContentLoaded", function(){
	
	GAME.init();

	//Fullscreen button
	var fullScreenBtn = document.createElement("div");
    fullScreenBtn.addEventListener("click", function(){
    	toggleFullScreen(GAME.renderer.view);
    }, false);
    fullScreenBtn.innerHTML = "F";
    fullScreenBtn.id = "fullScreen";
    document.body.appendChild(fullScreenBtn);

	
})
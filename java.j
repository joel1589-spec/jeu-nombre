public class Batiment {
    private Mur mur;
    private Toit toit;
    private Fenetre fenetre;
    
    public Batiment(Mur mur, Toit toit, Fenetre fenetre) {
        this.mur = mur;
        this.toit = toit;
        this.fenetre = fenetre;
    }
    
    public void construireBatiment() {
        System.out.println("Début de la construction du bâtiment :");
        mur.construire(); // Construire les murs
        toit.construire(); // Construire le toit
        fenetre.installer(); // Installer les fenêtres
        System.out.println("Bâtiment construit !");
    }
}
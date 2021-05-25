using ProjetClientBanque.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ProjetClientBanque.Forms
{
    public partial class Dépot : Form
    {
        private CompteBancaireService compteBancaireService;
        private MouvementBancaireService mouvementBancaireService;
        public Dépot()
        {
            InitializeComponent();
        }

        private void LoadTheme()
        {
            foreach (Control btns in this.Controls)
            {
                if (btns.GetType() == typeof(Button))
                {
                    Button btn = (Button)btns;
                    btn.BackColor = ThemeColor.PrimaryColor;
                    btn.ForeColor = Color.White;
                    btn.FlatAppearance.BorderColor = ThemeColor.SecondaryColor;
                }
            }
            //label4.ForeColor = ThemeColor.SecondaryColor;
            //label5.ForeColor = ThemeColor.PrimaryColor;
        }

        private void FormDepot_Load(object sender, EventArgs e)
        {
            LoadTheme();
            compteBancaireService = new CompteBancaireService();
            mouvementBancaireService = new MouvementBancaireService();
        }

        private void textBox2_TextChanged(object sender, EventArgs e)
        {
           
        }

        private void txtSomme_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!char.IsControl(e.KeyChar) && !char.IsDigit(e.KeyChar) &&
       (e.KeyChar != '.'))
            {
                e.Handled = true;
            }

            // only allow one decimal point
            if ((e.KeyChar == '.') && ((sender as TextBox).Text.IndexOf('.') > -1))
            {
                e.Handled = true;
            }
        }

        private void txtSomme_Leave(object sender, EventArgs e)
        {
            txtSomme.Text = string.Format("{0:#,##0.00}", double.Parse(txtSomme.Text));
        }

        private void numerosdecompte_Leave(object sender, EventArgs e)
        {
            string compteBancaire = TxtNumCompte.Text;
            bool is_compteBancaire = compteBancaireService.ifCompteBancaireExist(compteBancaire);
            if (!is_compteBancaire)
            {
                MessageBox.Show(compteBancaire + " n'est pas un compte bancaire valide!");
                TxtNumCompte.Text = "";
            }
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private async void button1_Click(object sender, EventArgs e)
        {
            double somme = double.Parse(txtSomme.Text);
            string motdepasse = txtMotdepasse.Text;
            string numerosdecompte = TxtNumCompte.Text;
            string typeMouvement = comboBoxTypeM.Text;
            var message = await mouvementBancaireService.doTransaction(somme, motdepasse, numerosdecompte, typeMouvement);
            MessageBox.Show(message);
        }
    }
}

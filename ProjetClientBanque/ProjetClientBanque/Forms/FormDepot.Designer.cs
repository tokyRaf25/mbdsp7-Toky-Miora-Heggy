
namespace ProjetClientBanque.Forms
{
    partial class Dépot
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.button1 = new System.Windows.Forms.Button();
            this.dateTimePicker1 = new System.Windows.Forms.DateTimePicker();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.TxtNumCompte = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.txtSomme = new System.Windows.Forms.TextBox();
            this.labelFormulaire = new System.Windows.Forms.Label();
            this.labelHistorique = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.txtMotdepasse = new System.Windows.Forms.TextBox();
            this.comboBoxTypeM = new System.Windows.Forms.ComboBox();
            this.label5 = new System.Windows.Forms.Label();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            this.dateMouvement = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Somme = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.Type = new System.Windows.Forms.DataGridViewTextBoxColumn();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            this.SuspendLayout();
            // 
            // button1
            // 
            this.button1.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.button1.Location = new System.Drawing.Point(122, 464);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(215, 39);
            this.button1.TabIndex = 1;
            this.button1.Text = "Valider l\'opération";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // dateTimePicker1
            // 
            this.dateTimePicker1.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.dateTimePicker1.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.dateTimePicker1.Location = new System.Drawing.Point(613, 27);
            this.dateTimePicker1.Name = "dateTimePicker1";
            this.dateTimePicker1.Size = new System.Drawing.Size(215, 25);
            this.dateTimePicker1.TabIndex = 2;
            // 
            // label1
            // 
            this.label1.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(116, 161);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(0, 15);
            this.label1.TabIndex = 3;
            // 
            // label2
            // 
            this.label2.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(122, 239);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(116, 15);
            this.label2.TabIndex = 4;
            this.label2.Text = "Numéros de compte";
            // 
            // TxtNumCompte
            // 
            this.TxtNumCompte.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.TxtNumCompte.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.TxtNumCompte.Location = new System.Drawing.Point(122, 258);
            this.TxtNumCompte.Multiline = true;
            this.TxtNumCompte.Name = "TxtNumCompte";
            this.TxtNumCompte.Size = new System.Drawing.Size(215, 34);
            this.TxtNumCompte.TabIndex = 5;
            this.TxtNumCompte.Leave += new System.EventHandler(this.numerosdecompte_Leave);
            // 
            // label3
            // 
            this.label3.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(122, 171);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(48, 15);
            this.label3.TabIndex = 6;
            this.label3.Text = "Somme";
            // 
            // txtSomme
            // 
            this.txtSomme.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.txtSomme.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtSomme.Location = new System.Drawing.Point(122, 189);
            this.txtSomme.Multiline = true;
            this.txtSomme.Name = "txtSomme";
            this.txtSomme.Size = new System.Drawing.Size(215, 34);
            this.txtSomme.TabIndex = 7;
            this.txtSomme.Text = "0";
            this.txtSomme.TextChanged += new System.EventHandler(this.textBox2_TextChanged);
            this.txtSomme.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.txtSomme_KeyPress);
            this.txtSomme.Leave += new System.EventHandler(this.txtSomme_Leave);
            // 
            // labelFormulaire
            // 
            this.labelFormulaire.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.labelFormulaire.AutoSize = true;
            this.labelFormulaire.Font = new System.Drawing.Font("Segoe UI", 13F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.labelFormulaire.Location = new System.Drawing.Point(122, 122);
            this.labelFormulaire.Name = "labelFormulaire";
            this.labelFormulaire.Size = new System.Drawing.Size(103, 25);
            this.labelFormulaire.TabIndex = 9;
            this.labelFormulaire.Text = "Formulaire";
            // 
            // labelHistorique
            // 
            this.labelHistorique.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.labelHistorique.AutoSize = true;
            this.labelHistorique.Font = new System.Drawing.Font("Segoe UI", 13F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.labelHistorique.Location = new System.Drawing.Point(422, 122);
            this.labelHistorique.Name = "labelHistorique";
            this.labelHistorique.Size = new System.Drawing.Size(336, 25);
            this.labelHistorique.TabIndex = 10;
            this.labelHistorique.Text = "Historique des mouvements bancaires";
            // 
            // label4
            // 
            this.label4.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(122, 305);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(77, 15);
            this.label4.TabIndex = 11;
            this.label4.Text = "Mot de passe";
            // 
            // txtMotdepasse
            // 
            this.txtMotdepasse.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.txtMotdepasse.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtMotdepasse.Location = new System.Drawing.Point(122, 323);
            this.txtMotdepasse.Multiline = true;
            this.txtMotdepasse.Name = "txtMotdepasse";
            this.txtMotdepasse.Size = new System.Drawing.Size(215, 34);
            this.txtMotdepasse.TabIndex = 12;
            // 
            // comboBoxTypeM
            // 
            this.comboBoxTypeM.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.comboBoxTypeM.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.comboBoxTypeM.FormattingEnabled = true;
            this.comboBoxTypeM.Items.AddRange(new object[] {
            "CREDIT",
            "DEBIT"});
            this.comboBoxTypeM.Location = new System.Drawing.Point(122, 397);
            this.comboBoxTypeM.Name = "comboBoxTypeM";
            this.comboBoxTypeM.Size = new System.Drawing.Size(215, 25);
            this.comboBoxTypeM.TabIndex = 14;
            this.comboBoxTypeM.SelectedIndexChanged += new System.EventHandler(this.comboBox1_SelectedIndexChanged);
            // 
            // label5
            // 
            this.label5.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(123, 379);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(115, 15);
            this.label5.TabIndex = 15;
            this.label5.Text = "Type de mouvement";
            // 
            // dataGridView1
            // 
            this.dataGridView1.Anchor = System.Windows.Forms.AnchorStyles.Top;
            this.dataGridView1.BackgroundColor = System.Drawing.SystemColors.ButtonHighlight;
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.dateMouvement,
            this.Somme,
            this.Type});
            this.dataGridView1.Location = new System.Drawing.Point(422, 189);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.RowTemplate.Height = 25;
            this.dataGridView1.Size = new System.Drawing.Size(444, 314);
            this.dataGridView1.TabIndex = 16;
            // 
            // dateMouvement
            // 
            this.dateMouvement.HeaderText = "Date du mouvement";
            this.dateMouvement.Name = "dateMouvement";
            this.dateMouvement.Width = 200;
            // 
            // Somme
            // 
            this.Somme.HeaderText = "Somme";
            this.Somme.Name = "Somme";
            // 
            // Type
            // 
            this.Type.HeaderText = "Type";
            this.Type.Name = "Type";
            // 
            // Dépot
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(888, 582);
            this.Controls.Add(this.dataGridView1);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.comboBoxTypeM);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.txtMotdepasse);
            this.Controls.Add(this.labelHistorique);
            this.Controls.Add(this.labelFormulaire);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.txtSomme);
            this.Controls.Add(this.dateTimePicker1);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.TxtNumCompte);
            this.Name = "Dépot";
            this.Text = "FormDepot";
            this.Load += new System.EventHandler(this.FormDepot_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.DateTimePicker dateTimePicker1;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox TxtNumCompte;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txtSomme;
        private System.Windows.Forms.Label labelFormulaire;
        private System.Windows.Forms.Label labelHistorique;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox txtMotdepasse;
        private System.Windows.Forms.ComboBox comboBoxTypeM;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.DataGridView dataGridView1;
        private System.Windows.Forms.DataGridViewTextBoxColumn dateMouvement;
        private System.Windows.Forms.DataGridViewTextBoxColumn Somme;
        private System.Windows.Forms.DataGridViewTextBoxColumn Type;
    }
}
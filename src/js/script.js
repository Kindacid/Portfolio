 const experienceData = {
        work: `
          <div class="experience-item">
            <div class="circle">
              <img src="https://img.freepik.com/vetores-gratis/design-de-icone-de-lotus-de-logotipo-empresarial_53876-115927.jpg?semt=ais_hybrid&w=740" alt="Logo" />
            </div>
            <div class="text-box">
              <p>Freelancer &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp 2022-Atualmente<br>Atuando principalemnte com Design Gráfico e Designs UX e UI</p>
            </div>
          </div>

          <div class="experience-item">
            <div class="circle">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSACS_ExZ_fMf2Fqa3X6i2YwfqWbyNgvowpew&s" alt="Logo" />
            </div>
            <div class="text-box">
              <p>Foundever &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2024-Atualmente<br>Responsável por suporte interno, atualização de planilhas e auxílio na organização e coordenação de equipes</p>
            </div>
          </div>
        `,
        studies: `
          <div class="experience-item">
            <div class="circle">
              <img src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/9bb50643006761.57e0399de11e7.png" alt="Logo" />
            </div>
            <div class="text-box">
              <p>SAGA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2020 - 2022<br> Design Gráfico e Digital</p>
            </div>
          </div>

          <div class="experience-item">
            <div class="circle">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3WfXvekFMuz5FHPFRqzR1V5Q9ctrtX5oCdA&s" alt="Logo" />
            </div>
            <div class="text-box">
              <p>USJT &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2023-2025<br> Análise e Desenvolvimento de Sistemas</p>
            </div>
          </div>
        `
      };

      function showExperience(type, button) {
        document.getElementById('experience-content').innerHTML = experienceData[type];

        // Atualiza as classes dos botões
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        button.classList.add('active');
      }

      function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }

      function goToSection(sectionId) {
        window.location.href = `index.html#${sectionId}`;
        };
        
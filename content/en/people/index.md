---
title: People
date: 2022-10-24
type: landing
sections:
  - block: people
    content:
      title: 
      # Choose which groups/teams of users to display.
      #   Edit `user_groups` in each user's profile to add them to one or more of these groups.
      user_groups:
          - Faculty
          - Ph.D. Students
          - Master Students
          - Undergraduates
          - Visiting Students
          - Graduate Students

      sort_by: Params.last_name
      sort_ascending: true
    design:
      show_interests: false
      show_role: true
      show_social: true

  - block: hero
    design:
      spacing:
        padding: ['0','0','0','']
      background: 
        image: 
          filename: bg.png

    content:
      title: 
      text: |
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            .grid-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(500px, 1fr)); /* 列的自动填充，最小宽度200px */
                grid-gap: 10px; /* 列之间的间隔 */}

            .center-text {
            text-align: center;}

            .flex-container {
            display: flex;
            justify-content: space-between;
            flex-direction:row; /* 在容器中平均分布元素 */
            }

            .flex-element {
            flex: 0.5; /* 元素占据可用空间的比例 */}
        </style>
        <div style="margin-top:-13%;width:160%;">
        <p style="font-size:1.5rem;text-align:center">Other Members</p>
        <div class="flex-container">

          <div class="flex-element;text-align:center">
              <img src="oyj.jpg" style="border-radius: 50%;width:160px;position: relative;">
              <p style="font-size:1rem;text-align: center;margin-top:6%;">欧阳健</p>
              <p style="font-size:0.7rem;color:grey;text-align: center;margin-top:-7%">Jian Ouyang</p>
              <p style="font-size:0.7rem;color:grey;text-align: center;margin-top:-12%;margin-bottom:-13%">Advanced Research Scholar</p>
              <a href="mailto:ouyj@mail.sustech.edu.cn" style="font-size:0.7rem;text-decoration:none;text-align: center;">ouyj@mail.sustech.edu.cn</a>
          </div>

          <div class="flex-element;text-align:center">
              <img src="wh.png" style="border-radius: 50%;width:160px;">
              <p style="font-size:1rem;text-align: center;margin-top:6%;">吴昊</p>
              <p style="font-size:0.7rem;color:grey;text-align: center;margin-top:-7%">Hao Wu</p>
              <p style="font-size:0.7rem;color:grey;text-align: center;margin-top:-12%;margin-bottom:-13%">Research Scholar</p>
              <a href="mailto:wuh3@mail.sustech.edu.cn" style="font-size:0.7rem;text-decoration:none;text-align: center;">wuh3@mail.sustech.edu.cn</a>
          </div>

          <div class="flex-element;text-align:center">
              <img src="wlf.jpg" style="border-radius: 50%;width:160px;">
              <p style="font-size:1rem;text-align: center;margin-top:6%;">王璐峰</p>
              <p style="font-size:0.7rem;color:grey;text-align: center;margin-top:-7%">Lufeng Wang</p>
              <p style="font-size:0.7rem;color:grey;text-align: center;margin-top:-12%;margin-bottom:-13%">Algorithm Engineer</p>
              <a href="mailto:wanglf@mail.sustech.edu.cn" style="font-size:0.7rem;text-decoration:none;text-align: center;">wanglf@mail.sustech.edu.cn</a>
          </div>

          <div class="flex-element;text-align:center">
              <img src="lg.png" style="border-radius: 50%;width:160px;">
              <p style="font-size:1rem;text-align: center;margin-top:6%;">李广</p>
              <p style="font-size:0.7rem;color:grey;text-align: center;margin-top:-7%">Guang Li</p>
              <p style="font-size:0.7rem;color:grey;text-align: center;margin-top:-12%;margin-bottom:-13%">Algorithm Engineer</p>
              <a href="mailto:1451513175@qq.com" style="font-size:0.7rem;text-decoration:none;text-align: center;">1451513175@qq.com</a>
          </div>
          
          <div class="flex-element;text-align:center">
              <img src="fx.png" style="border-radius: 50%;width:160px;">
              <p style="font-size:1rem;text-align: center;margin-top:6%;">付辛</p>
              <p style="font-size:0.7rem;color:grey;text-align: center;margin-top:-7%">Xin Fu</p>
              <p style="font-size:0.7rem;color:grey;text-align: center;margin-top:-12%;margin-bottom:-13%">Administrative Assistant</p>
              <a href="mailto:fux@mail.sustech.edu.cn" style="font-size:0.7rem;text-decoration:none;text-align: center;">fux@mail.sustech.edu.cn</a>
          </div>

        </div>
        </div>
---
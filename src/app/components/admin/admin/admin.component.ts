import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    console.log(this.auth.isLoggedIn());
    $('.sub-list').hide();
    $('.has-sub').click(function(e){
      e.stopPropagation();
      $('.sub-list').show();
      const thistoggle=$(this).find(".sub-list");
      const up=$(this).find(".up");
      const down=$(this).find(".down");
      const thisitem=$(this);
      $('.has-sub').each(function(){
        if(thisitem[0]!=$(this)[0]&&$(this).find('.sub-list').hasClass("show-sub-menu")){
          $(this).find(".sub-list").removeClass('show-sub-menu');
          $(this).find(".up").removeClass('show-up');
          $(this).find('.down').removeClass('hide-down');
        }
      });
      thistoggle.toggleClass('show-sub-menu');
      up.toggleClass('show-up');
      down.toggleClass('hide-down');
    })
  }

}
